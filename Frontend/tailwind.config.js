/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hys-blue': '#0A1128',
        'hys-gold': '#D4AF37',
      }
    },
  },
  plugins: [],
}