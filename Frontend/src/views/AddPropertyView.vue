<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// --- Formular Variablen ---
const userType = ref('private')
const nameOrCompany = ref('')
const title = ref('')
const location = ref('')
const price = ref(0)
const type = ref('Apartment')
const description = ref('')
const selectedFile = ref<File | null>(null)
const imagePreview = ref<string | null>(null)

// --- NEU: MAUS-BEWEGUNG LOGIK ---
const mouseX = ref(0)
const mouseY = ref(0)

const handleMouseMove = (event: MouseEvent) => {
  // Wir erhöhen den Multiplikator auf 60 für einen stärkeren Effekt
  mouseX.value = (event.clientX / window.innerWidth - 0.5) * 60
  mouseY.value = (event.clientY / window.innerHeight - 0.5) * 60
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})

const onFileSelected = (event: any) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const submitForm = async () => {
  const formData = new FormData()
  formData.append('userType', userType.value)
  formData.append('nameOrCompany', nameOrCompany.value)
  formData.append('title', title.value)
  formData.append('location', location.value)
  formData.append('price', String(price.value))
  formData.append('type', type.value)
  formData.append('description', description.value)
  if (selectedFile.value) formData.append('image', selectedFile.value)

  try {
    const response = await fetch('http://localhost:3000/api/properties', { method: 'POST', body: formData })
    if (response.ok) router.push('/')
  } catch (error) { console.error(error) }
}
</script>

<template>
  <div class="min-h-screen relative overflow-hidden font-sans">
    
 <!-- HINTERGRUND-BILD (ZURÜCK ZUM SCHÖNEN LOOK) -->
    <div 
      class="fixed inset-[-20px] z-0 transition-transform duration-500 ease-out"
      :style="{ transform: `translate(${mouseX}px, ${mouseY}px)` }"
    >
      <img 
        src="../assets/addis-night.jpg" 
        class="w-full h-full object-cover scale-100 brightness-[1.1] contrast-[1.1]"
        style="object-position: center 30%;"
        alt="Addis Night"
      />
      <!-- Hauchdünner Schutzfilter -->
      <div class="absolute inset-0 bg-black/10 backdrop-blur-[0.5px]"></div>
    </div>
    <!-- INHALT (DAS FORMULAR) -->
    <div class="relative z-10 py-12 px-4 min-h-screen flex items-center justify-center">
      <div class="max-w-3xl w-full bg-black/30 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-[3rem] p-10 border border-white/10">
        
        <!-- ÜBERSCHRIFT GOLD -->
        <h1 class="text-4xl font-black text-center mb-10 tracking-tighter uppercase text-[#D4AF37] italic drop-shadow-lg">
          {{ $t('nav.add') }}
        </h1>

        <form @submit.prevent="submitForm" class="space-y-8">
          
          <!-- OPTIONEN WÄHLER -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button type="button" @click="userType = 'private'" 
              :class="userType === 'private' ? 'bg-[#D4AF37] text-black scale-105' : 'bg-white/5 text-white border border-white/10'"
              class="py-4 rounded-2xl font-black transition-all uppercase text-[10px] tracking-widest"
            >👤 Private</button>
            <button type="button" @click="userType = 'broker'" 
              :class="userType === 'broker' ? 'bg-[#D4AF37] text-black scale-105' : 'bg-white/5 text-white border border-white/10'"
              class="py-4 rounded-2xl font-black transition-all uppercase text-[10px] tracking-widest"
            >🎖️ Broker</button>
            <button type="button" @click="userType = 'developer'" 
              :class="userType === 'developer' ? 'bg-[#D4AF37] text-black scale-105' : 'bg-white/5 text-white border border-white/10'"
              class="py-4 rounded-2xl font-black transition-all uppercase text-[10px] tracking-widest"
            >🏢 Company</button>
          </div>

          <!-- DYNAMISCHES NAMENSFELD -->
          <div v-if="userType !== 'private'" class="space-y-2">
            <input v-model="nameOrCompany" type="text" 
              class="w-full p-4 bg-white/5 rounded-2xl border border-white/10 outline-none focus:border-[#D4AF37] text-white transition-all" 
              :placeholder="userType === 'broker' ? 'Your Name' : 'Company Name'" required />
          </div>

          <!-- REST DES FORMULARS -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input v-model="title" type="text" placeholder="Property Title" class="p-4 bg-white/5 rounded-2xl border border-white/10 text-white outline-none focus:border-[#D4AF37]" required />
            <input v-model="location" type="text" placeholder="Location (e.g. Bole)" class="p-4 bg-white/5 rounded-2xl border border-white/10 text-white outline-none focus:border-[#D4AF37]" required />
          </div>

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

          <!-- BILD VORSCHAU GLASS LOOK -->
          <div class="p-8 bg-white/5 rounded-[2rem] border-2 border-dashed border-white/10 flex flex-col items-center group hover:border-[#D4AF37]/50 transition-all">
             <div v-if="imagePreview" class="mb-6 w-full h-56 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
                <img :src="imagePreview" class="w-full h-full object-cover" />
             </div>
             <input type="file" @change="onFileSelected" accept="image/*" class="text-xs text-gray-400 file:bg-[#D4AF37] file:text-black file:rounded-full file:px-6 file:py-2 file:border-0 file:font-black cursor-pointer" />
          </div>

          <button type="submit" class="w-full bg-[#D4AF37] text-black py-5 rounded-2xl font-black text-xl hover:bg-[#F3CF55] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all uppercase tracking-widest">
             Confirm & Publish 🚀
          </button>
        </form>

      </div>
    </div>
  </div>
</template>