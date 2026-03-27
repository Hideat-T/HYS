<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const title = ref('')
const location = ref('')
const price = ref(0)
const rooms = ref(1)
const type = ref('Apartment')
const description = ref('')
const selectedFile = ref<File | null>(null) // NEU: Hier speichern wir die Datei

// Funktion: Wenn der Nutzer ein Bild auswählt
const onFileSelected = (event: any) => {
  selectedFile.value = event.target.files[0]
}

const submitForm = async () => {
  // WICHTIG: Wir nutzen FormData für den Datei-Upload
  const formData = new FormData()
  formData.append('title', title.value)
  formData.append('location', location.value)
  formData.append('price', String(price.value))
  formData.append('rooms', String(rooms.value))
  formData.append('type', type.value)
  formData.append('description', description.value)
  
  if (selectedFile.value) {
    formData.append('image', selectedFile.value) // Das Bild einpacken
  }

  try {
    const response = await fetch('http://localhost:3000/api/properties', {
      method: 'POST',
      body: formData // Kein JSON.stringify nötig bei FormData!
    })

    if (response.ok) {
      alert("Erfolgreich mit Foto hochgeladen! 📸🇪🇹")
      router.push('/')
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-8 bg-white shadow-2xl rounded-[2.5rem] mt-10 mb-20 border border-gray-100">
    <h1 class="text-3xl font-black text-blue-900 mb-8 text-center italic">{{ $t('nav.add') }}</h1>
    
    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Titel -->
      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">{{ $t('addForm.title') }}</label>
        <input v-model="title" type="text" class="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>

      <!-- Foto-Upload Feld (NEU!) -->
      <div class="bg-blue-50 p-6 rounded-2xl border-2 border-dashed border-blue-200">
        <label class="block text-sm font-bold text-blue-900 mb-2 uppercase tracking-widest">Foto auswählen 📸</label>
        <input type="file" @change="onFileSelected" accept="image/*" class="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-blue-900 file:text-white hover:file:bg-blue-800 cursor-pointer" />
      </div>

      <!-- Ort und Preis -->
      <div class="grid grid-cols-2 gap-4">
        <input v-model="location" type="text" :placeholder="$t('addForm.placeholderLocation')" class="p-4 bg-gray-50 rounded-2xl outline-none" required />
        <input v-model.number="price" type="number" class="p-4 bg-gray-50 rounded-2xl outline-none font-bold text-blue-700" required />
      </div>

      <!-- Typ und Zimmer -->
      <div class="grid grid-cols-2 gap-4">
        <select v-model="type" class="p-4 bg-gray-50 rounded-2xl outline-none font-bold">
          <option value="Apartment">{{ $t('home.apartment') }}</option>
          <option value="House">{{ $t('home.house') }}</option>
        </select>
        <input v-model.number="rooms" type="number" class="p-4 bg-gray-50 rounded-2xl outline-none" />
      </div>

      <!-- Beschreibung -->
      <textarea v-model="description" rows="3" class="w-full p-4 bg-gray-50 rounded-2xl outline-none"></textarea>

      <button type="submit" class="w-full bg-blue-900 text-white py-5 rounded-2xl font-black text-xl hover:shadow-2xl transition-all">
        {{ $t('addForm.submit') }}
      </button>
    </form>
  </div>
</template>