<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { t } = useI18n()
const property = ref<any>(null)
const loading = ref(true)

// HIER WIRD DER WHATSAPP LINK ERSTELLT
const whatsappLink = computed(() => {
  if (!property.value) return '#'
  const phone = "251911223344" // Beispiel-Nummer Äthiopien
  const message = t('details.interestMessage') + property.value.title
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
})

onMounted(async () => {
  try {
    const id = route.params.id 
    const response = await fetch('http://localhost:3000/api/properties')
    const all = await response.json()
    property.value = all.find((p: any) => p.id === Number(id))
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div v-if="property" class="max-w-5xl mx-auto p-6 mb-20">
    <!-- Zurück Button -->
    <router-link to="/" class="inline-flex items-center text-blue-600 font-bold mb-6 hover:underline">
      ← {{ $t('details.back') }}
    </router-link>
    
    <div class="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
      <img :src="property.imageUrl" class="w-full h-[450px] object-cover" />
      
      <div class="p-10">
        <div class="flex justify-between items-start mb-8">
          <div>
            <h1 class="text-5xl font-black text-gray-900 mb-2 italic tracking-tighter">{{ property.title }}</h1>
            <p class="text-xl text-gray-400 font-medium">📍 {{ property.location }}</p>
          </div>
          <div class="text-right bg-blue-50 p-4 rounded-3xl border border-blue-100">
            <p class="text-xs text-blue-400 font-black uppercase tracking-widest">{{ $t('details.price') }}</p>
            <p class="text-3xl font-black text-blue-700">{{ property.price.toLocaleString() }} <span class="text-sm">ETB</span></p>
          </div>
        </div>

        <!-- Zimmer Info -->
        <div class="flex gap-4 mb-10">
          <div class="bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100 font-bold text-gray-700">
            🛏️ {{ property.rooms }} {{ $t('details.rooms') }}
          </div>
          <div class="bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100 font-bold text-gray-700">
            🏠 {{ property.type === 'Apartment' ? $t('home.apartment') : $t('home.house') }}
          </div>
        </div>

        <p class="text-gray-600 text-lg leading-relaxed mb-12 italic border-l-4 border-yellow-500 pl-6">
          "{{ property.description }}"
        </p>

        <!-- WHATSAPP KONTAKT BEREICH -->
        <div class="bg-blue-900 p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between text-white shadow-xl">
          <div class="mb-6 md:mb-0 text-center md:text-left">
            <p class="text-blue-300 text-sm font-bold uppercase tracking-widest mb-1">{{ $t('details.contact') }}</p>
            <p class="text-2xl font-black italic">HYS Real Estate Agent</p>
          </div>
          
          <a :href="whatsappLink" target="_blank" 
             class="bg-[#25D366] hover:bg-[#128C7E] text-white px-10 py-5 rounded-2xl font-black text-xl transition-all transform hover:scale-105 shadow-lg flex items-center gap-3">
            {{ $t('details.contactWhatsApp') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>