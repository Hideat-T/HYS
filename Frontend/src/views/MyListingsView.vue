<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const myProperties = ref<any[]>([])
const loading = ref(true)

const fetchMyProperties = async () => {
  const savedUser = localStorage.getItem('user')
  if (!savedUser) return

  const user = JSON.parse(savedUser)
  
  try {
    const response = await fetch(`http://localhost:3000/api/properties/user/${user.id}`)
    const data = await response.json()
    myProperties.value = data
  } catch (error) {
    console.error("Error loading my properties:", error)
  } finally {
    loading.value = false
  }
}

const deleteItem = async (id: number) => {
  if (!confirm(t('details.confirmDelete'))) return
  await fetch(`http://localhost:3000/api/properties/${id}`, { method: 'DELETE' })
  fetchMyProperties() // Refresh the list
}

onMounted(() => {
  fetchMyProperties()
})
</script>

<template>
  <div class="max-w-6xl mx-auto p-6">
    <h1 class="text-3xl font-black text-blue-900 mb-8 italic uppercase tracking-tighter">
      My Listings / የኔ ማስታወቂያዎች
    </h1>

    <div v-if="loading" class="text-center py-10">Loading Dashboard...</div>

    <div v-else-if="myProperties.length === 0" class="bg-white p-10 rounded-[2rem] text-center shadow-inner">
      <p class="text-gray-400 italic">You haven't posted any properties yet.</p>
      <router-link to="/add" class="text-blue-600 font-bold underline mt-4 block">Post your first ad now!</router-link>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="prop in myProperties" :key="prop.id" class="bg-white rounded-[2rem] shadow-lg overflow-hidden border border-gray-100 p-4">
        <img :src="prop.imageUrl" class="w-full h-40 object-cover rounded-2xl mb-4" />
        <h2 class="font-bold text-lg text-gray-800">{{ prop.title }}</h2>
        <p class="text-blue-700 font-black">{{ prop.price?.toLocaleString() }} ETB</p>
        
        <div class="flex gap-2 mt-4">
           <button @click="deleteItem(prop.id)" class="flex-1 bg-red-50 text-red-500 py-2 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all">
             Delete
           </button>
           <router-link :to="'/property/' + prop.id" class="flex-1 bg-gray-100 text-center py-2 rounded-xl font-bold hover:bg-gray-200">
            <!-- Find the buttons in MyListingsView.vue and add this one -->
<router-link 
    :to="'/edit/' + prop.id" 
    class="flex-1 bg-blue-50 text-blue-600 text-center py-2 rounded-xl font-bold hover:bg-blue-100 transition-all"
>
    Edit 📝
</router-link>
             View
           </router-link>
        </div>
      </div>
    </div>
  </div>
</template>