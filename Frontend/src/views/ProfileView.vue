<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentUser = ref<any>(null)

// --- MOUSE MOVEMENT LOGIC ---
const mouseX = ref(0)
const mouseY = ref(0)
const handleMouseMove = (event: MouseEvent) => {
  mouseX.value = (event.clientX / window.innerWidth - 0.5) * 60
  mouseY.value = (event.clientY / window.innerHeight - 0.5) * 60
}

onMounted(() => {
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
})

const formatDate = (id: number) => {
  return new Date(id).toLocaleDateString()
}
</script>

<template>
  <div class="min-h-screen relative overflow-hidden font-sans flex items-center justify-center">
    
    <!-- BACKGROUND -->
    <div 
      class="fixed inset-[-20px] z-0 transition-transform duration-500 ease-out"
      :style="{ transform: `translate(${mouseX}px, ${mouseY}px)` }"
    >
      <img src="../assets/addis-night.jpg" class="w-full h-full object-cover brightness-[1.1] contrast-[1.1]" />
      <div class="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
    </div>

    <!-- PROFILE CARD -->
    <div class="relative z-10 w-full max-w-2xl px-4">
      <div v-if="currentUser" class="bg-black/40 backdrop-blur-2xl shadow-2xl rounded-[3rem] p-12 border border-white/10 text-center">
        
        <!-- Avatar Circle -->
        <div class="w-32 h-32 bg-gold-gradient rounded-full mx-auto mb-6 flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(212,175,55,0.5)]">
          👤
        </div>

        <h1 class="logo-style-text text-4xl uppercase tracking-widest mb-2 italic">
          {{ currentUser.name }}
        </h1>
        <p class="text-[#D4AF37] font-bold uppercase tracking-[0.3em] text-xs mb-10">
          Verified {{ currentUser.role }}
        </p>

        <!-- Info Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div class="bg-white/5 p-6 rounded-2xl border border-white/10">
            <p class="text-white/40 text-[10px] uppercase font-black mb-1">Email Address</p>
            <p class="text-white font-medium">{{ currentUser.email }}</p>
          </div>
          <div class="bg-white/5 p-6 rounded-2xl border border-white/10">
            <p class="text-white/40 text-[10px] uppercase font-black mb-1">Member Since</p>
            <p class="text-white font-medium">{{ formatDate(currentUser.id) }}</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="mt-10 flex gap-4">
          <router-link to="/my-listings" class="flex-1 bg-white/10 text-white py-4 rounded-2xl font-bold hover:bg-white/20 transition-all border border-white/10">
            My Ads
          </router-link>
          <router-link to="/" class="flex-1 bg-gold-gradient text-[#0A1128] py-4 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 transition-all">
            Home
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>