<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const properties = ref<any[]>([])
const loading = ref(true)
const currentUser = ref<any>(null)

// --- Filter-Logik ---
const searchQuery = ref('')
const selectedType = ref('All')

const fetchProperties = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/properties')
    const data = await response.json()
    properties.value = data
  } catch (error) {
    console.error("Error:", error)
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
    console.error(error)
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
  const savedUser = localStorage.getItem('user')
  if (savedUser) currentUser.value = JSON.parse(savedUser)
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 pb-20">
    
    <!-- [SECTION 2: LUXURY HERO BOX] -->
    <section class="mt-8 mb-12">
      <div class="bg-linear-to-br from-[#0B1C2E] to-[#0F2A44] rounded-[40px] py-20 px-6 text-center shadow-2xl border border-white/5 relative overflow-hidden">
        <!-- Deko-Effekt im Hintergrund -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-hys-gold/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        
        <h1 class="text-gold-gradient text-5xl md:text-7xl font-black mb-6 tracking-tighter italic">
          {{ $t('home.title') }}
        </h1>
        
        <!-- Kleine goldene Linie aus dem Screenshot -->
        <div class="w-32 h-1 bg-gold-gradient mx-auto mb-8 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.6)]"></div>
        
        <p class="text-white/60 text-sm md:text-base uppercase tracking-[0.4em] font-light">
          Ethiopia's Premium Real Estate Portal <span class="text-hys-gold ml-2">ET</span>
        </p>
      </div>
    </section>

    <!-- [SECTION: FLOATING SEARCH BAR] -->
    <div class="max-w-4xl mx-auto -mt-20 relative z-20 mb-20 px-4">
      <div class="bg-white p-4 rounded-3xl shadow-[0_20px_50px_rgba(11,28,46,0.15)] flex flex-col md:flex-row gap-4 border border-gray-100">
        <div class="flex-1 relative">
          <span class="absolute left-5 top-4 text-gray-400">🔍</span>
          <input 
            v-model="searchQuery" 
            type="text" 
            :placeholder="$t('home.search')" 
            class="w-full pl-14 pr-6 py-4 rounded-2xl border-none bg-gray-50 focus:ring-2 focus:ring-hys-gold outline-none transition-all font-medium"
          />
        </div>
        <select 
          v-model="selectedType"
          class="bg-gray-50 px-8 py-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-hys-gold font-bold text-hys-navy cursor-pointer"
        >
          <option value="All">{{ $t('home.all') }}</option>
          <option value="House">{{ $t('home.house') }}</option>
          <option value="Apartment">{{ $t('home.apartment') }}</option>
        </select>
      </div>
    </div>

    <!-- [SECTION: PROPERTY LIST] -->
    <div class="flex justify-between items-end mb-10 px-2">
      <div>
        <h2 class="text-hys-navy text-3xl font-black uppercase tracking-tighter">Featured Listings</h2>
        <div class="w-12 h-1 bg-hys-gold mt-2 rounded-full"></div>
      </div>
      <p class="text-gray-400 text-sm font-medium">{{ filteredProperties.length }} Results</p>
    </div>

    <!-- Ladeanzeige -->
    <div v-if="loading" class="text-center py-20">
       <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-hys-navy mx-auto"></div>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      
      <div v-if="filteredProperties.length === 0" class="col-span-full text-center py-20 text-gray-400 italic">
        {{ $t('home.noResults') }}
      </div>

      <!-- PREMIUM PROPERTY CARD -->
      <div v-for="prop in filteredProperties" :key="prop.id" class="property-card flex flex-col h-full group">
        <!-- Image with Badge -->
        <div class="relative h-72 overflow-hidden rounded-t-[24px]">
          <img :src="prop.imageUrl" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div class="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-hys-navy shadow-lg uppercase tracking-widest">
            {{ prop.type === 'Apartment' ? $t('home.apartment') : $t('home.house') }}
          </div>
        </div>

        <!-- Content -->
        <div class="p-8 flex flex-col flex-1">
          <h3 class="text-xl font-black text-hys-navy mb-1 leading-tight">{{ prop.title }}</h3>
          <p class="text-gray-400 text-xs mb-4 font-medium italic">📍 {{ prop.location }}</p>
          
          <!-- User Badge -->
          <div class="flex items-center gap-2 mb-6">
            <div class="bg-hys-bg px-3 py-1 rounded-lg text-[10px] font-bold text-hys-navy border border-gray-100 uppercase tracking-tighter">
              👤 {{ prop.ownerName || 'Private' }}
            </div>
          </div>

          <div class="mt-auto border-t border-gray-50 pt-6">
            <div class="flex justify-between items-center mb-6">
              <div>
                <p class="text-[9px] text-gray-300 font-black uppercase tracking-widest mb-1">{{ $t('details.price') }}</p>
                <p class="text-2xl font-black text-hys-navy leading-none">
                  {{ prop.price?.toLocaleString() }} <span class="text-xs font-bold text-hys-gold">ETB</span>
                </p>
              </div>
              
              <!-- Delete Button (Only for Owner) -->
              <button 
                v-if="currentUser && String(currentUser.id) === String(prop.userId)"
                @click="deleteProperty(prop.id)" 
                class="bg-red-50 text-red-500 p-3 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
              >
                🗑️
              </button>
            </div>

            <!-- View Details Button -->
            <router-link 
              :to="'/property/' + prop.id" 
              class="block w-full text-center bg-hys-navy text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg hover:bg-hys-navy-light active:scale-95"
            >
              {{ $t('details.back') }}
            </router-link>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>