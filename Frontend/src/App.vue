<script setup lang="ts">
// 1. Wir importieren die Sprach-Steuerung
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
</script>

<template>
  <div class="min-h-screen bg-gray-50 font-sans text-gray-900">
    
    <!-- NAVIGATION -->
    <nav class="bg-white shadow-md p-4 sticky top-0 z-50">
      <div class="max-w-6xl mx-auto flex justify-between items-center">
        
        <!-- Logo -->
        <router-link to="/" class="text-3xl font-black text-blue-900 tracking-tighter">
          HYS <span class="text-yellow-500">IMMO</span> 🇪🇹
        </router-link>
        
        <!-- Rechts: Sprachwähler + Button -->
        <div class="flex items-center gap-4">
          
          <!-- DER SPRACH-UMSCHALTER -->
          <select 
            v-model="locale" 
            class="bg-gray-100 border-none p-2 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
          >
            <option value="en">🇬🇧 EN</option>
            <option value="am">🇪🇹 AM (አማርኛ)</option>
            <option value="de">🇩🇪 DE</option>
          </select>

          <!-- Dynamischer Button: Der Text kommt jetzt aus dem 'Wörterbuch' -->
          <router-link 
            to="/add" 
            class="bg-blue-900 text-white px-5 py-2 rounded-xl font-bold shadow-lg hover:bg-blue-800 transition-all hidden md:block"
          >
            {{ $t('nav.add') }}
          </router-link>
        </div>
      </div>
    </nav>

    <!-- ROUTER VIEW (Hier landen HomeView, DetailsView oder AddView) -->
    <router-view />

    <!-- FOOTER -->
    <footer class="p-10 text-center text-gray-400 mt-10">
      &copy; 2024 HYS Real Estate - Addis Abeba, Ethiopia
    </footer>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>