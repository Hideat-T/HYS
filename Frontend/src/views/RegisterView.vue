<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

const name = ref('')
const email = ref('')
const password = ref('')
const role = ref('private')

// --- MOUSE MOVEMENT LOGIC (Luxury Background) ---
const mouseX = ref(0)
const mouseY = ref(0)
const handleMouseMove = (event: MouseEvent) => {
  mouseX.value = (event.clientX / window.innerWidth - 0.5) * 60
  mouseY.value = (event.clientY / window.innerHeight - 0.5) * 60
}

onMounted(() => window.addEventListener('mousemove', handleMouseMove))
onUnmounted(() => window.removeEventListener('mousemove', handleMouseMove))

const handleRegister = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
        role: role.value
      })
    })

    const data = await response.json()

    if (response.ok) {
      alert("Registration successful! / ምዝገባው ተሳክቷል! 🇪🇹")
      router.push('/login')
    } else {
      alert("Error: " + data.message)
    }
  } catch (error) {
    console.error("Connection error:", error)
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
      <img src="../assets/addis-night.jpg" class="w-full h-full object-cover brightness-[1.1] contrast-[1.1]" style="object-position: center 30%;" />
      <div class="absolute inset-0 bg-[#0A1128]/70 backdrop-blur-[3px]"></div>
    </div>

    <!-- REGISTER CARD -->
    <div class="relative z-10 w-full max-w-lg px-6">
      <div class="bg-black/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[3.5rem] p-10 border border-white/10 text-center">
        
        <div class="mb-8">
           <h1 class="logo-style-text text-3xl md:text-4xl uppercase tracking-tighter italic">
             {{ $t('registerPage.title') }}
           </h1>
           <div class="w-16 h-1 bg-gold-gradient mx-auto mt-2 rounded-full shadow-[0_0_15px_#D4AF37]"></div>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-5">
          
          <!-- ROLE SELECTION -->
          <div class="grid grid-cols-3 gap-2 mb-4">
            <button type="button" @click="role = 'private'" 
              :class="role === 'private' ? 'bg-gold-gradient text-[#0A1128] scale-105 shadow-lg' : 'bg-white/5 text-white border border-white/10'"
              class="py-3 rounded-xl font-black text-[9px] uppercase transition-all tracking-widest">
              {{ $t('registerPage.rolePrivate') }}
            </button>
            <button type="button" @click="role = 'broker'" 
              :class="role === 'broker' ? 'bg-gold-gradient text-[#0A1128] scale-105 shadow-lg' : 'bg-white/5 text-white border border-white/10'"
              class="py-3 rounded-xl font-black text-[9px] uppercase transition-all tracking-widest">
              {{ $t('registerPage.roleBroker') }}
            </button>
            <button type="button" @click="role = 'developer'" 
              :class="role === 'developer' ? 'bg-gold-gradient text-[#0A1128] scale-105 shadow-lg' : 'bg-white/5 text-white border border-white/10'"
              class="py-3 rounded-xl font-black text-[9px] uppercase transition-all tracking-widest">
              {{ $t('registerPage.roleCompany') }}
            </button>
          </div>

          <div class="space-y-3">
            <input v-model="name" type="text" :placeholder="$t('registerPage.name')" 
              class="w-full p-4 bg-white/5 rounded-[1.2rem] border border-white/10 text-white outline-none focus:border-[#D4AF37] transition-all placeholder:text-white/20" required />
            
            <input v-model="email" type="email" :placeholder="$t('registerPage.email')" 
              class="w-full p-4 bg-white/5 rounded-[1.2rem] border border-white/10 text-white outline-none focus:border-[#D4AF37] transition-all placeholder:text-white/20" required />
            
            <input v-model="password" type="password" :placeholder="$t('registerPage.password')" 
              class="w-full p-4 bg-white/5 rounded-[1.2rem] border border-white/10 text-white outline-none focus:border-[#D4AF37] transition-all placeholder:text-white/20" required />
          </div>

          <button type="submit" class="w-full bg-gold-gradient text-[#0A1128] py-5 rounded-[1.5rem] font-black text-lg hover:brightness-110 transition-all uppercase tracking-widest shadow-xl active:scale-95 border-t border-white/30 mt-4">
             {{ $t('registerPage.submit') }}
          </button>

          <p class="text-center text-white/50 text-sm mt-6">
            {{ $t('registerPage.alreadyAccount') }}
            <router-link to="/login" class="text-[#D4AF37] font-black hover:underline ml-1">
              {{ $t('registerPage.login') }}
            </router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>