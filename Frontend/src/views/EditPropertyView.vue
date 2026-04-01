<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// [SECTION: FORM DATA]
const title = ref('')
const location = ref('')
const price = ref(0)
const rooms = ref(1)
const type = ref('Apartment')
const description = ref('')
const selectedFiles = ref<File[]>([])
const imagePreviews = ref<string[]>([])

// [SECTION: LOAD EXISTING DATA]
onMounted(async () => {
  const id = route.params.id
  try {
    const response = await fetch(`http://localhost:3000/api/properties`)
    const all = await response.json()
    const prop = all.find((p: any) => p.id === Number(id))

    if (prop) {
      title.value = prop.title
      location.value = prop.location
      price.value = prop.price
      rooms.value = prop.rooms
      type.value = prop.type
      description.value = prop.description
      imagePreviews.value = prop.images || [prop.imageUrl]
    }
  } catch (error) { console.error(error) }
  window.addEventListener('mousemove', handleMouseMove)
})

// [SECTION: FILE LOGIC]
const onFilesSelected = (event: any) => {
  const files = Array.from(event.target.files) as File[]
  selectedFiles.value = [...selectedFiles.value, ...newFiles]
  imagePreviews.value = selectedFiles.value.map(file => URL.createObjectURL(file))
}

// [SECTION: SUBMIT UPDATE]
const submitUpdate = async () => {
  const formData = new FormData()
  formData.append('title', title.value)
  formData.append('location', location.value)
  formData.append('price', String(price.value))
  formData.append('rooms', String(rooms.value))
  formData.append('type', type.value)
  formData.append('description', description.value)

  selectedFiles.value.forEach(file => formData.append('images', file))

  try {
    const response = await fetch(`http://localhost:3000/api/properties/${route.params.id}`, {
      method: 'PUT',
      body: formData
    })
    if (response.ok) {
      alert("Update successful! 📝✅")
      router.push('/my-listings')
    }
  } catch (error) { console.error(error) }
}

// [SECTION: BACKGROUND ANIMATION]
const mouseX = ref(0)
const mouseY = ref(0)
const handleMouseMove = (event: MouseEvent) => {
  mouseX.value = (event.clientX / window.innerWidth - 0.5) * 60
  mouseY.value = (event.clientY / window.innerHeight - 0.5) * 60
}
onUnmounted(() => window.removeEventListener('mousemove', handleMouseMove))
</script>

<template>
  <div class="min-h-screen relative overflow-hidden font-sans">
    <!-- BACKGROUND -->
    <div class="fixed inset-[-20px] z-0 transition-transform duration-500 ease-out" :style="{ transform: `translate(${mouseX}px, ${mouseY}px)` }">
      <img src="../assets/addis-night.jpg" class="w-full h-full object-cover brightness-[1.1]" />
      <div class="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
    </div>

    <!-- FORM -->
    <div class="relative z-10 py-12 px-4 min-h-screen flex flex-col items-center">
      <div class="max-w-3xl w-full bg-black/40 backdrop-blur-2xl shadow-2xl rounded-[3rem] p-10 border border-white/10">
        <h1 class="text-4xl font-black text-center mb-10 text-[#D4AF37] italic uppercase">Edit Property</h1>

        <form @submit.prevent="submitUpdate" class="space-y-6">
          <input v-model="title" type="text" class="w-full p-4 bg-white/5 rounded-2xl border border-white/10 text-white outline-none focus:border-[#D4AF37]" required />
          
          <div class="grid grid-cols-2 gap-6">
             <input v-model="location" type="text" class="p-4 bg-white/5 rounded-2xl border border-white/10 text-white outline-none" required />
             <input v-model.number="price" type="number" class="p-4 bg-white/5 rounded-2xl border border-white/10 text-[#D4AF37] font-black outline-none" required />
          </div>

          <button type="submit" class="w-full bg-[#D4AF37] text-black py-5 rounded-2xl font-black text-xl hover:bg-[#F3CF55] shadow-lg">
             Save Changes 💾
          </button>
        </form>
      </div>
    </div>
  </div>
</template>