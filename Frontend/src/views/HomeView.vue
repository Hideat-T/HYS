<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const properties = ref<any[]>([])
const loading = ref(true)
const searchQuery = ref('')
const selectedType = ref('All')

const fetchProperties = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/properties')
    const data = await response.json()
    properties.value = data
  } catch (error) {
    console.error("Error loading properties:", error)
  } finally {
    loading.value = false
  }
}

const deleteProperty = async (id: number) => {
  if (!confirm(t('details.confirmDelete'))) return
  try {
    const response = await fetch(`http://localhost:3000/api/properties/${id}`, { method: 'DELETE' })
    if (response.ok) fetchProperties()
  } catch (error) {
    console.error("Error deleting:", error)
  }
}

const filteredProperties = computed(() => {
  return properties.value.filter(prop => {
    const matchesSearch = prop.title?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          prop.location?.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesType = selectedType.value === 'All' || prop.type === selectedType.value
    return matchesSearch && matchesType
  })
})

onMounted(() => {
  fetchProperties()
})
</script>

<template>
  <div class="max-w-6xl mx-auto p-6 min-h-[60vh]">
    <!-- Header -->
    <!-- HEADER SECTION -->
<header class="mb-12 text-center py-10 bg-[#0A1128] rounded-[3rem] shadow-2xl border border-[#D4AF37]/20 mt-6 mx-4">
  <h1 class="logo-style-text text-5xl md:text-7xl mb-4 tracking-tighter drop-shadow-2xl">
    {{ $t('home.title') }}
  </h1>
  <p class="text-[#D4AF37]/80 text-lg uppercase tracking-[0.5em] font-light italic">
    ETHIOPIA'S PREMIUM PORTAL <span class="align-top text-xs ml-2">ET</span>
  </p>
  <div class="w-40 h-1 bg-gold-gradient mx-auto mt-6 rounded-full shadow-[0_0_15px_#D4AF37]"></div>
</header>

    <!-- Search Bar -->
    <div class="bg-white p-5 rounded-[2rem] shadow-xl mb-12 flex flex-col md:flex-row gap-4 border border-blue-50">
      <div class="flex-1 relative">
        <span class="absolute left-5 top-4 text-gray-400">🔍</span>
        <input v-model="searchQuery" type="text" :placeholder="$t('home.search')" class="w-full pl-14 pr-6 py-4 rounded-2xl border-none bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" />
      </div>
      <select v-model="selectedType" class="bg-gray-50 px-6 py-4 rounded-2xl border-none outline-none font-bold text-gray-600 cursor-pointer">
        <option value="All">{{ $t('home.all') }}</option>
        <option value="House">{{ $t('home.house') }}</option>
        <option value="Apartment">{{ $t('home.apartment') }}</option>
      </select>
    </div>

    <!-- Results -->
    <div v-if="loading" class="text-center py-20">Loading...</div>
    
    <div v-else-if="filteredProperties.length === 0" class="text-center py-20 text-gray-400 italic">
      {{ $t('home.noResults') }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <div v-for="prop in filteredProperties" :key="prop.id" class="bg-white rounded-[2.5rem] shadow-lg overflow-hidden border border-gray-50 hover:shadow-2xl transition-all">
        <img :src="prop.imageUrl" class="w-full h-64 object-cover" />
        
        <div class="p-8">
          <h2 class="text-2xl font-black text-gray-800 mb-1">{{ prop.title }}</h2>
          <p class="text-gray-400 text-sm mb-4">📍 {{ prop.location }}</p>
          
          <!-- New: Seller Info -->
          <div class="flex items-center gap-2 mb-4 bg-blue-50 p-2 rounded-lg inline-flex">
             <span class="text-xs font-bold text-blue-900 uppercase">👤 {{ prop.ownerName || 'Private' }}</span>
          </div>

          <div class="border-t border-gray-100 pt-6">
            <div class="flex justify-between items-center mb-5">
              <div>
                <p class="text-[10px] text-gray-300 font-black uppercase mb-1">{{ $t('details.price') }}</p>
                <p class="text-2xl font-black text-blue-700">{{ prop.price?.toLocaleString() }} ETB</p>
              </div>
              <button @click="deleteProperty(prop.id)" class="bg-red-50 text-red-500 p-3 rounded-2xl hover:bg-red-500 hover:text-white transition-all">🗑️</button>
            </div>
            <router-link :to="'/property/' + prop.id" class="block w-full text-center bg-blue-900 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg">
               {{ $t('nav.home') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>