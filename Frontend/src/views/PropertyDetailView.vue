<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { t } = useI18n()

// [SECTION: STATES]
const property = ref<any>(null)
const loading = ref(true)
const activeImage = ref<string | null>(null) // Das aktuell groß angezeigte Bild

// [SECTION: WHATSAPP LOGIC]
const whatsappLink = computed(() => {
  if (!property.value) return '#'
  const phone = "251911223344" // Beispiel-Nummer Äthiopien
  const message = t('details.interestMessage') + property.value.title
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
})

// [SECTION: DATA LOADING]
onMounted(async () => {
  try {
    const id = route.params.id 
    const response = await fetch('http://localhost:3000/api/properties')
    const all = await response.json()
    const found = all.find((p: any) => p.id === Number(id))
    
    if (found) {
      property.value = found
      // Setze das erste Bild aus der Galerie als Start-Bild
      // Falls es keine Galerie gibt (alte Posts), nimm das einzelne imageUrl
      activeImage.value = (found.images && found.images.length > 0) ? found.images[0] : found.imageUrl
    }
  } catch (e) {
    console.error("Fehler beim Laden:", e)
  } finally {
    loading.value = false
  }
})

// [SECTION: GALLERY ACTION]
const setMainImage = (url: string) => {
  activeImage.value = url
}
</script>

<template>
  <div v-if="property" class="max-w-5xl mx-auto p-6 mb-20">
    <!-- Zurück Button -->
    <router-link to="/" class="inline-flex items-center text-blue-600 font-bold mb-6 hover:underline">
      ← {{ $t('details.back') }}
    </router-link>
    
    <div class="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
      
      <!-- [SECTION: PHOTO GALLERY] -->
      <div class="relative group bg-gray-200">
        <!-- Das Hauptbild (groß) -->
        <img 
          :src="activeImage" 
          class="w-full h-[500px] object-cover transition-all duration-500" 
        />
        
        <!-- Thumbnail-Leiste (nur wenn mehr als 1 Bild da ist) -->
        <div v-if="property.images && property.images.length > 1" 
             class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 p-3 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
           <div 
             v-for="(img, index) in property.images" 
             :key="index" 
             @click="setMainImage(img)"
             :class="activeImage === img ? 'border-[#D4AF37] scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'"
             class="w-20 h-14 rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-300"
           >
             <img :src="img" class="w-full h-full object-cover" />
           </div>
        </div>
      </div>
      
      <!-- [SECTION: CONTENT DETAILS] -->
      <div class="p-10">
        <div class="flex justify-between items-start mb-8">
          <div>
            <h1 class="text-5xl font-black text-gray-900 mb-2 italic tracking-tighter">{{ property.title }}</h1>
            <p class="text-xl text-gray-400 font-medium">📍 {{ property.location }}</p>
          </div>
          <div class="text-right bg-blue-50 p-5 rounded-[2rem] border border-blue-100 shadow-inner">
            <p class="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em] mb-1">{{ $t('details.price') }}</p>
            <p class="text-3xl font-black text-blue-700 leading-none">
              {{ property.price.toLocaleString() }} <span class="text-sm font-bold">ETB</span>
            </p>
          </div>
        </div>

        <!-- Zimmer & Typ Info -->
        <div class="flex gap-4 mb-10">
          <div class="bg-gray-50 px-8 py-4 rounded-2xl border border-gray-100 font-black text-gray-700 shadow-sm">
            🛏️ {{ property.rooms }} {{ $t('details.rooms') }}
          </div>
          <div class="bg-gray-50 px-8 py-4 rounded-2xl border border-gray-100 font-black text-gray-700 shadow-sm">
            🏠 {{ property.type === 'Apartment' ? $t('home.apartment') : $t('home.house') }}
          </div>
        </div>

        <!-- Beschreibung -->
        <div class="mb-12">
            <h3 class="text-xs font-black text-gray-300 uppercase tracking-widest mb-4 italic">Description / መግለጫ</h3>
            <p class="text-gray-600 text-lg leading-relaxed border-l-4 border-[#D4AF37] pl-6 italic">
              "{{ property.description }}"
            </p>
        </div>

        <!-- WHATSAPP KONTAKT BEREICH -->
        <div class="bg-blue-900 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between text-white shadow-2xl mt-10 relative overflow-hidden">
          <!-- Kleiner Deko-Effekt im Hintergrund -->
          <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
          
          <div class="mb-6 md:mb-0 text-center md:text-left relative z-10">
            <p class="text-blue-300 text-xs font-black uppercase tracking-[0.3em] mb-2">{{ $t('details.contact') }}</p>
            <p class="text-2xl font-black italic">HYS Real Estate Agent</p>
            <p class="text-blue-400 text-sm mt-1">Verified Partner 🇪🇹</p>
          </div>
          
          <a :href="whatsappLink" target="_blank" 
             class="bg-[#25D366] hover:bg-[#128C7E] text-white px-12 py-5 rounded-[1.5rem] font-black text-xl transition-all transform hover:scale-105 active:scale-95 shadow-[0_10px_20px_rgba(37,211,102,0.3)] flex items-center gap-3 relative z-10">
            {{ $t('details.contactWhatsApp') }}
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Ladeanzeige falls Daten noch nicht da sind -->
  <div v-else class="text-center py-20 font-bold text-gray-400">
    {{ loading ? 'Loading / በመጫን ላይ...' : 'Property not found / አልተገኘም' }}
  </div>
</template>