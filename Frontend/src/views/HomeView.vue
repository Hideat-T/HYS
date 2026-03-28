<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const properties = ref<any[]>([])
const loading = ref(true)

// --- Filter-Variablen ---
const searchQuery = ref('')
const selectedType = ref('All')

// --- 1. Daten vom Backend laden ---
const fetchProperties = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/properties')
    const data = await response.json()
    properties.value = data
  } catch (error) {
    console.error("Fehler beim Laden:", error)
  } finally {
    loading.value = false
  }
}

// --- 2. Inserat löschen ---
const deleteProperty = async (id: number) => {
  // Sicherheitsabfrage (nutzt Texte aus dem Wörterbuch)
  if (!confirm(t('details.confirmDelete'))) return

  try {
    const response = await fetch(`http://localhost:3000/api/properties/${id}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      // Liste sofort aktualisieren
      fetchProperties()
    }
  } catch (error) {
    console.error("Fehler beim Löschen:", error)
  }
}

// --- 3. Filter-Logik (Echtzeit-Suche) ---
const filteredProperties = computed(() => {
  return properties.value.filter(prop => {
    // Suche in Titel und Ort
    const matchesSearch = prop.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          prop.location.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    // Filter nach Haus oder Wohnung
    const matchesType = selectedType.value === 'All' || prop.type === selectedType.value

    return matchesSearch && matchesType
  })
})

onMounted(() => {
  fetchProperties()
})
</script>

<template>
  <div class="max-w-6xl mx-auto p-6">
    
    <!-- HEADER -->
    <header class="mb-12 text-center">
      <h1 class="text-5xl font-black text-blue-900 mb-2 italic tracking-tighter">
        {{ $t('home.title') }}
      </h1>
      <p class="text-gray-400 text-lg uppercase tracking-[0.3em] italic">Ethiopia's Premium Portal 🇪🇹</p>
      <div class="w-24 h-2 bg-yellow-500 mx-auto mt-4 rounded-full"></div>
    </header>

    <!-- SUCH- UND FILTERLEISTE -->
    <div class="bg-white p-5 rounded-[2rem] shadow-xl mb-12 flex flex-col md:flex-row gap-4 border border-blue-50">
      <!-- Suchfeld -->
      <div class="flex-1 relative">
        <span class="absolute left-5 top-4 text-gray-400">🔍</span>
        <input 
          v-model="searchQuery" 
          type="text" 
          :placeholder="$t('home.search')" 
          class="w-full pl-14 pr-6 py-4 rounded-2xl border-none bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-gray-700 shadow-inner"
        />
      </div>

      <!-- Auswahl Haus/Wohnung -->
      <select 
        v-model="selectedType"
        class="bg-gray-50 px-6 py-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-500 font-bold text-gray-600 cursor-pointer shadow-inner"
      >
        <option value="All">{{ $t('home.all') }}</option>
        <option value="House">{{ $t('home.house') }}</option>
        <option value="Apartment">{{ $t('home.apartment') }}</option>
      </select>
    </div>

    <!-- LADEANZEIGE -->
    <div v-if="loading" class="flex flex-col justify-center items-center py-20">
       <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-900 mb-4"></div>
       <p class="font-bold text-blue-900 animate-pulse">Lade Immobilien...</p>
    </div>

    <!-- KARTEN-LISTE -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      
      <!-- Nachricht wenn Suche leer ist -->
      <div v-if="filteredProperties.length === 0" class="col-span-full text-center py-20">
        <p class="text-3xl mb-2">🕵️‍♂️</p>
        <p class="text-gray-400 italic text-xl">{{ $t('home.noResults') }}</p>
      </div>

      <!-- Einzelne Immobilien-Karte -->
      <div v-for="prop in filteredProperties" :key="prop.id" 
           class="bg-white rounded-[2.5rem] shadow-lg overflow-hidden border border-gray-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
        
        <!-- Bild-Bereich -->
        <div class="relative overflow-hidden h-64">
          <img :src="prop.imageUrl" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div class="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-blue-900 shadow-lg uppercase tracking-widest">
            {{ prop.type === 'Apartment' ? $t('home.apartment') : $t('home.house') }}
          </div>
        </div>

        <!-- Text-Bereich -->
        <div class="p-8">
          <h2 class="text-2xl font-black text-gray-800 mb-1 leading-tight">{{ prop.title }}</h2>
          <p class="text-gray-400 text-sm mb-6 flex items-center font-medium italic">
            <span class="mr-2">📍</span> {{ prop.location }}
          </p>
          
          <!-- NEU STRUKTURIERTER BEREICH AB HIER -->
          <div class="border-t border-gray-100 pt-6">
            
            <!-- Erste Zeile: Preis und Lösch-Button nebeneinander -->
            <div class="flex justify-between items-center mb-5">
              <div>
                <p class="text-[10px] text-gray-300 font-black uppercase tracking-[0.2em] mb-1">{{ $t('details.price') }}</p>
                <p class="text-2xl font-black text-blue-700 leading-none">
                  {{ prop.price.toLocaleString() }} <span class="text-xs">ETB</span>
                </p>
              </div>

              <!-- Lösch-Button bleibt klein und dezent daneben -->
              <button 
                @click="deleteProperty(prop.id)" 
                class="bg-red-50 text-red-500 p-3 rounded-2xl hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm"
              >
                🗑️
              </button>
            </div>

            <!-- Zweite Zeile: Der große "Details"-Button über die volle Breite -->
            <router-link 
              :to="'/property/' + prop.id" 
              class="block w-full text-center bg-blue-900 hover:bg-blue-800 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
            >
              {{ $t('nav.home') }}
            </router-link>

          </div>
        </div>
        </div>
      </div>
    </div>
  
</template>

<style scoped>
/* Sanfter Übergang beim Laden der Liste */
.grid {
  animation: fadeIn 0.5s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>