<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

const email = ref('')
const password = ref('')

// --- MOUSE MOVEMENT LOGIC (Luxury Background) ---
const mouseX = ref(0)
const mouseY = ref(0)
const handleMouseMove = (event: MouseEvent) => {
  mouseX.value = (event.clientX / window.innerWidth - 0.5) * 60
  mouseY.value = (event.clientY / window.innerHeight - 0.5) * 60
}

onMounted(() => window.addEventListener('mousemove', handleMouseMove))
onUnmounted(() => window.removeEventListener('mousemove', handleMouseMove))

// --- LOGIN LOGIC ---
const handleLogin = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })

    const data = await response.json()

    if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        alert("Welcome back / እንኳን ደህና መጡ " + data.user.name + "! ✨");
        window.location.href = "/"; 
    } else {
        alert("Error: " + data.message)
    }
  } catch (error) {
    console.error("Login error:", error)
  }
}
</script>

<template>
  <div class="min-h-screen relative overflow-hidden font-sans flex items-center justify-center">
    
    <!-- BACKGROUND (Addis Night) -->
    <div 
      class="fixed inset-[-20px] z-0 transition-transform duration-500 ease-out"
      :style="{ transform: `translate(${mouseX}px, ${mouseY}px)` }"
    >
      <img 
        src="../assets/addis-night.jpg" 
        class="w-full h-full object-cover brightness-[1.1] contrast-[1.1]"
        style="object-position: center 30%;"
      />
      <div class="absolute inset-0 bg-[#0A1128]/70 backdrop-blur-[3px]"></div>
    </div>

    <!-- LOGIN CARD -->
    <div class="relative z-10 w-full max-w-md px-6">
      <div class="bg-black/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[3.5rem] p-12 border border-white/10 text-center">
        
        <div class="mb-10">
           <h1 class="logo-style-text text-4xl uppercase tracking-tighter italic">
             {{ $t('loginPage.title') }}
           </h1>
           <div class="w-16 h-1 bg-gold-gradient mx-auto mt-2 rounded-full shadow-[0_0_15px_#D4AF37]"></div>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-4">
            <input 
              v-model="email" 
              type="email" 
              :placeholder="$t('loginPage.email')" 
              class="w-full p-5 bg-white/5 rounded-[1.5rem] border border-white/10 text-white outline-none focus:border-[#D4AF37] transition-all placeholder:text-white/30" 
              required 
            />
            
            <input 
              v-model="password" 
              type="password" 
              :placeholder="$t('loginPage.password')" 
              class="w-full p-5 bg-white/5 rounded-[1.5rem] border border-white/10 text-white outline-none focus:border-[#D4AF37] transition-all placeholder:text-white/30" 
              required 
            />
          </div>

          <button 
            type="submit" 
            class="w-full bg-gold-gradient text-[#0A1128] py-5 rounded-[1.5rem] font-black text-lg hover:brightness-110 transition-all uppercase tracking-widest shadow-lg active:scale-95 border-t border-white/30"
          >
             {{ $t('loginPage.submit') }}
          </button>

          <p class="text-center text-white/50 text-sm mt-8">
            {{ $t('loginPage.noAccount') }}
            <router-link to="/register" class="text-[#D4AF37] font-black hover:underline ml-1">
              {{ $t('loginPage.signup') }}
            </router-link>
          </p>
        </form>
      </div>
      
      <!-- Footer Copyright -->
      <p class="text-center text-white/20 text-[10px] mt-8 uppercase tracking-[0.4em] font-black">
        © 2024 HYS Real Estate Investment
      </p>
    </div>
  </div>
</template>