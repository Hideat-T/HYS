<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

// [SECTION: FORM DATA]
const title = ref('')
const location = ref('')
const price = ref(0)
const rooms = ref(1)
const type = ref('Apartment')
const description = ref('')

// [SECTION: USER INFO]
const currentUser = ref<any>(null)

// [SECTION: MULTIPLE IMAGES DATA]
const selectedFiles = ref<File[]>([]) 
const imagePreviews = ref<string[]>([]) 

// [SECTION: FILE SELECTION LOGIC - APPEND MODE]
const onFilesSelected = (event: any) => {
  const newFiles = Array.from(event.target.files) as File[]
  
  // Überprüfung: Nicht mehr als 5 Bilder insgesamt
  if (selectedFiles.value.length + newFiles.length > 5) {
    alert("Maximum 5 photos allowed! / Maximal 5 Fotos erlaubt!")
    return
  }

  // WICHTIG: Neue Dateien an die alten ANHÄNGEN (Spread Operator ...)
  selectedFiles.value = [...selectedFiles.value, ...newFiles]
  
  // Previews aktualisieren
  imagePreviews.value = selectedFiles.value.map(file => URL.createObjectURL(file))
  
  // Trick: Input zurücksetzen, damit man die gleiche Datei nochmal wählen könnte
  event.target.value = ''
}

// [SECTION: REMOVE PHOTO LOGIC]
const removePhoto = (index: number) => {
  // Ressourcen-Management: Preview-URL löschen um Speicher zu sparen
  URL.revokeObjectURL(imagePreviews.value[index])
  
  selectedFiles.value.splice(index, 1)
  imagePreviews.value.splice(index, 1)
}

// [SECTION: SUBMIT FORM]
const submitForm = async () => {
  if (!currentUser.value) {
    alert("Please login first!")
    return
  }

  const formData = new FormData()
  formData.append('title', title.value)
  formData.append('location', location.value)
  formData.append('price', String(price.value))
  formData.append('rooms', String(rooms.value))
  formData.append('type', type.value)
  formData.append('description', description.value)
  
  // User Info automatisch mitsenden
  formData.append('ownerName', currentUser.value.name)
  formData.append('userRole', currentUser.value.role)
  formData.append('userId', String(currentUser.value.id))

  // Alle Bilder aus dem Array in FormData packen
  selectedFiles.value.forEach(file => {
    formData.append('images', file)
  })

  try {
    const response = await fetch('http://localhost:3000/api/properties', { 
        method: 'POST', 
        body: formData 
    })
    
    if (response.ok) {
      alert(t('addForm.submitSuccess') || "Success! 📸")
      router.push('/')
    } else {
      alert("Server Error while saving.")
    }
  } catch (error) { 
    console.error("Upload error:", error) 
  }
}

// [SECTION: BACKGROUND & LIFECYCLE]
const mouseX = ref(0)
const mouseY = ref(0)
const handleMouseMove = (event: MouseEvent) => {
  mouseX.value = (event.clientX / window.innerWidth - 0.5) * 60
  mouseY.value = (event.clientY / window.innerHeight - 0.5) * 60
}

onMounted(() => {
  // User aus dem Speicher laden
  const savedUser = localStorage.getItem('user')
  if (!savedUser) {
    router.push('/login')
  } else {
    currentUser.value = JSON.parse(savedUser)
  }
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  // Alle Preview-URLs beim Verlassen der Seite löschen
  imagePreviews.value.forEach(url => URL.revokeObjectURL(url))
})
</script>

<template>
  <div class="min-h-screen relative overflow-hidden font-sans">
    
    <!-- LUXURY BACKGROUND -->
    <div class="fixed inset-[-20px] z-0 transition-transform duration-500 ease-out"
      :style="{ transform: `translate(${mouseX}px, ${mouseY}px)` }">
      <img src="../assets/addis-night.jpg" class="w-full h-full object-cover brightness-[1.1] contrast-[1.1]" alt="Addis Night" />
      <div class="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
    </div>

    <!-- CONTENT -->
    <div class="relative z-10 py-12 px-4 min-h-screen flex flex-col items-center">
      <div class="max-w-3xl w-full bg-black/40 backdrop-blur-2xl shadow-2xl rounded-[3rem] p-10 border border-white/10">
        
        <h1 class="text-4xl font-black text-center mb-10 tracking-tighter uppercase text-[#D4AF37] italic drop-shadow-lg">
          {{ $t('nav.add') }}
        </h1>

        <!-- Info box: Shows who is posting -->
        <div v-if="currentUser" class="mb-8 p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-2xl text-center">
            <p class="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">Posting as / Inserieren als:</p>
            <p class="text-white font-black text-lg italic">{{ currentUser.name }} ({{ currentUser.role }})</p>
        </div>

        <form @submit.prevent="submitForm" class="space-y-6">
          
          <!-- Title & Location -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input v-model="title" type="text" :placeholder="$t('addForm.title')" class="p-4 bg-white/5 rounded-2xl border border-white/10 text-white outline-none focus:border-[#D4AF37]" required />
            <input v-model="location" type="text" :placeholder="$t('addForm.location')" class="p-4 bg-white/5 rounded-2xl border border-white/10 text-white outline-none focus:border-[#D4AF37]" required />
          </div>

          <!-- Price & Type -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="relative">
              <span class="absolute right-4 top-4 text-[#D4AF37] font-bold">ETB</span>
              <input v-model.number="price" type="number" class="w-full p-4 bg-white/5 rounded-2xl border border-white/10 text-[#D4AF37] font-black outline-none" required />
            </div>
            <select v-model="type" class="p-4 bg-white/5 rounded-2xl border border-white/10 text-white outline-none">
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
            </select>
          </div>

          <!-- PHOTO UPLOAD AREA -->
          <div class="p-8 bg-white/5 rounded-[2rem] border-2 border-dashed border-white/10 flex flex-col items-center">
             <label class="block text-sm font-black text-[#D4AF37] mb-4 uppercase tracking-widest">
               Photos (Max 5) 📸
             </label>

             <!-- Preview Grid -->
             <div v-if="imagePreviews.length > 0" class="grid grid-cols-3 gap-4 mb-6 w-full">
                <div v-for="(url, index) in imagePreviews" :key="url" class="relative group h-24 rounded-xl overflow-hidden border border-white/20 shadow-lg">
                    <img :src="url" class="w-full h-full object-cover" />
                    <button 
                        type="button"
                        @click="removePhoto(index)" 
                        class="absolute top-1 right-1 bg-red-600 text-white w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shadow-lg"
                    >
                        X
                    </button>
                </div>
             </div>

             <!-- File Input -->
             <input 
                type="file" 
                multiple 
                @change="onFilesSelected" 
                accept="image/*" 
                class="text-xs text-gray-400 file:bg-[#D4AF37] file:text-black file:rounded-full file:px-6 file:py-2 file:border-0 file:font-black cursor-pointer w-full" 
             />
          </div>

          <!-- Description -->
          <textarea v-model="description" rows="3" :placeholder="$t('addForm.description')" class="w-full p-4 bg-white/5 rounded-2xl border border-white/10 text-white outline-none"></textarea>

        <!-- [SECTION: LUXURY GOLD SUBMIT BUTTON] -->
<button 
  type="submit" 
  class="w-full bg-gold-gradient text-[#0A1128] py-5 rounded-[1.5rem] font-black text-xl hover:brightness-110 transition-all uppercase tracking-widest shadow-[0_10px_40px_rgba(212,175,55,0.4)] active:scale-95 border-t border-white/30"
>
  {{ $t('addForm.submit') }}
</button>
        </form>
      </div>
    </div>
  </div>
</template>