<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const currentUser = ref<any>(null)

// Diese Funktion sucht im Speicher des Browsers nach dem User
const checkUser = () => {
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    currentUser.value = JSON.parse(savedUser)
  } else {
    currentUser.value = null
  }
}

onMounted(() => {
  checkUser()
})

const handleLogout = () => {
  localStorage.removeItem('user')
  currentUser.value = null
  window.location.href = "/" 
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 font-sans text-gray-900">
    
    <!-- NAVIGATION BAR -->
    <!-- NAVIGATION BAR -->
   <!-- [SECTION: LUXURY NAVIGATION WITH IMAGE LOGO] -->
    <nav class="bg-[#0A1128] shadow-2xl p-4 sticky top-0 z-50 border-b border-[#D4AF37]/30">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        
        <!-- LEFT: BRANDING -->
        <router-link to="/" class="flex items-center group">
          <!-- THE LOGO IMAGE -->
          <img 
            src="./assets/logo-gold.png" 
            alt="HYS Real Estate" 
            class="h-10 md:h-14 w-auto transition-transform duration-300 group-hover:scale-110"
          />
          <!-- BRAND NAME IN CINZEL FONT -->
          <span class="logo-style-text text-xl ml-3 tracking-[0.2em] hidden sm:block uppercase">
            HYS IMMO
          </span>
        </router-link>

        <!-- RIGHT: MENU & AUTH -->
        <div class="flex items-center gap-4 md:gap-8">
          
          <!-- PRIVATE DASHBOARD LINKS (Only if logged in) -->
          <div v-if="currentUser" class="hidden lg:flex items-center gap-6 border-r border-white/10 pr-6">
            <router-link to="/my-listings" class="text-white/70 hover:text-[#D4AF37] text-[10px] font-black uppercase tracking-widest transition-colors">
              {{ $t('nav.home') }}
            </router-link>
            <router-link to="/profile" class="text-white/70 hover:text-[#D4AF37] text-[10px] font-black uppercase tracking-widest transition-colors">
              Profile
            </router-link>
          </div>

          <!-- LANGUAGE SELECTOR -->
          <select v-model="locale" class="bg-white/5 text-white border border-white/10 p-2 rounded-xl text-[10px] font-black outline-none cursor-pointer hover:bg-white/10 transition-all">
            <option class="text-black" value="en">GB EN</option>
            <option class="text-black" value="am">ET AM</option>
            <option class="text-black" value="om">ET OM</option>
            <option class="text-black" value="ti">ET TI</option>
            <option class="text-black" value="fr">FR FR</option>
            <option class="text-black" value="de">DE DE</option>
          </select>

          <!-- AUTH ACTIONS -->
          <div class="flex items-center gap-4">
            <div v-if="currentUser" class="flex items-center gap-3">
              <div class="hidden sm:flex flex-col items-end">
                <span class="text-[#D4AF37] font-black text-[10px] italic leading-none">Hello,</span>
                <span class="text-white font-black text-xs uppercase">{{ currentUser.name }}</span>
              </div>
              <button @click="handleLogout" class="text-red-400 text-[9px] font-black uppercase border border-red-400/30 px-2 py-1 rounded-lg hover:bg-red-400 hover:text-white transition-all">
                Logout
              </button>
            </div>
            
            <router-link v-else to="/login" class="text-[#D4AF37] font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors">
              {{ $t('nav.login') }}
            </router-link>

            <!-- POST AD BUTTON (Shiny Gold) -->
            <router-link 
              to="/add" 
              class="bg-gold-gradient text-[#0A1128] px-4 py-2 md:px-5 md:py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-[0_5px_20px_rgba(212,175,55,0.3)] hover:brightness-110 active:scale-95 transition-all border-t border-white/20"
            >
              {{ $t('nav.add') }}
            </router-link>
          </div>

        </div>
      </div>
    </nav>
    <!-- ROUTER VIEW (Where the pages appear) -->
    <router-view />

    <!-- FOOTER -->
    <footer class="p-10 text-center text-gray-400 mt-10">
      &copy; 2024 HYS Real Estate - Addis Ababa, Ethiopia
    </footer>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>