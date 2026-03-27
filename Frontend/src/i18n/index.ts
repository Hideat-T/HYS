import { createI18n } from 'vue-i18n'

const messages = {
  // --- ENGLISCH ---
  en: {
    nav: { home: 'Properties', add: 'Post Ad', login: 'Login' },
    home: { title: 'Find your dream home', search: 'Search location...', all: 'All', house: 'Houses', apartment: 'Apartments', noResults: 'No results found' },
    details: { 
        price: 'Price', 
        rooms: 'Rooms', 
        contact: 'Interested?', 
        contactWhatsApp: 'WhatsApp Chat 💬', 
        interestMessage: 'Hello! I am interested in this property: ', 
        back: 'Back',
        delete: 'Delete 🗑️',
        confirmDelete: 'Are you sure you want to delete this post?'
    },
    addForm: { 
        title: 'Title', 
        location: 'Location', 
        price: 'Price (ETB)', 
        type: 'Type', 
        rooms: 'Rooms', 
        description: 'Description', 
        submit: 'Post Now 🚀', 
        placeholderTitle: 'e.g. Villa in Bole', 
        placeholderLocation: 'e.g. Addis Ababa, CMC',
        submitSuccess: 'Property successfully posted! 📸'
    }
  },

  // --- DEUTSCH ---
  de: {
    nav: { home: 'Immobilien', add: 'Inserieren', login: 'Login' },
    home: { title: 'Finde dein Traumhaus', search: 'Ort suchen...', all: 'Alle', house: 'Häuser', apartment: 'Wohnungen', noResults: 'Keine Ergebnisse gefunden' },
    details: { 
        price: 'Preis', 
        rooms: 'Zimmer', 
        contact: 'Interesse?', 
        contactWhatsApp: 'WhatsApp Kontakt 💬', 
        interestMessage: 'Hallo! Ich interessiere mich für dieses Objekt: ', 
        back: 'Zurück',
        delete: 'Löschen 🗑️',
        confirmDelete: 'Bist du sicher, dass du dieses Inserat löschen möchtest?'
    },
    addForm: { 
        title: 'Titel der Immobilie', 
        location: 'Ort / Stadtteil', 
        price: 'Preis (ETB)', 
        type: 'Typ', 
        rooms: 'Anzahl Zimmer', 
        description: 'Beschreibung', 
        submit: 'Jetzt veröffentlichen 🚀', 
        placeholderTitle: 'z.B. Villa in Bole', 
        placeholderLocation: 'z.B. Addis Abeba, CMC',
        submitSuccess: 'Inserat erfolgreich erstellt! 📸'
    }
  },

  // --- AMHARISCH (አማርኛ) ---
  am: {
    nav: { home: 'መነሻ', add: 'ማስታወቂያ ይለጥፉ', login: 'ግባ' },
    home: { title: 'የህልምዎን ቤት ያግኙ', search: 'ቦታ ይፈልጉ...', all: 'ሁሉም', house: 'ቤቶች', apartment: 'አፓርታማዎች', noResults: 'ምንም ውጤት አልተገኘም' },
    details: { 
        price: 'ዋጋ', 
        rooms: 'ክፍሎች', 
        contact: 'ፍላጎት አለዎት?', 
        contactWhatsApp: 'በዋትስአፕ ያግኙ 💬', 
        interestMessage: 'ሰላም! ስለዚህ ንብረት ማወቅ እፈልጋለሁ፦ ', 
        back: 'ተመለስ',
        delete: 'አጥፋ 🗑️',
        confirmDelete: 'እርግጠኛ ነዎት ይህን ማስታወቂያ ማጥፋት ይፈልጋሉ?'
    },
    addForm: { 
        title: 'የንብረት ርዕስ', 
        location: 'ቦታ (ሰፈር)', 
        price: 'ዋጋ (በብር)', 
        type: 'ዓይነት', 
        rooms: 'የክፍል ብዛት', 
        description: 'መግለጫ', 
        submit: 'አሁን ይለጥፉ 🚀', 
        placeholderTitle: 'ለምሳሌ፡ ቦሌ የሚገኝ ቪላ', 
        placeholderLocation: 'ለምሳሌ፡ አዲስ አበባ፣ ሲኤምሲ',
        submitSuccess: 'ማስታወቂያው በተሳካ ሁኔታ ተለጥፏል! 📸'
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

export default i18n