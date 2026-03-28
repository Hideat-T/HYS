import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    nav: { home: 'Properties', add: 'Post Ad', login: 'Login' },
    home: { title: 'Find your dream home', search: 'Search location...', all: 'All', house: 'Houses', apartment: 'Apartments', noResults: 'No results found' },
    details: { price: 'Price', rooms: 'Rooms', contact: 'Interested?', contactWhatsApp: 'WhatsApp Chat 💬', interestMessage: 'Hello! I am interested in this property: ', back: 'Back', delete: 'Delete 🗑️', confirmDelete: 'Are you sure?' },
    addForm: { title: 'Title', location: 'Location', price: 'Price (ETB)', type: 'Type', rooms: 'Rooms', description: 'Description', submit: 'Post Now 🚀', placeholderTitle: 'e.g. Villa in Bole', placeholderLocation: 'e.g. Addis Ababa, CMC' }
  },
  de: {
    nav: { home: 'Immobilien', add: 'Inserieren', login: 'Login' },
    home: { title: 'Finde dein Traumhaus', search: 'Ort suchen...', all: 'Alle', house: 'Häuser', apartment: 'Wohnungen', noResults: 'Nichts gefunden' },
    details: { price: 'Preis', rooms: 'Zimmer', contact: 'Interesse?', contactWhatsApp: 'WhatsApp Kontakt 💬', interestMessage: 'Hallo! Ich interessiere mich für: ', back: 'Zurück', delete: 'Löschen 🗑️', confirmDelete: 'Bist du sicher?' },
    addForm: { title: 'Titel', location: 'Ort', price: 'Preis (ETB)', type: 'Typ', rooms: 'Zimmer', description: 'Beschreibung', submit: 'Jetzt posten 🚀', placeholderTitle: 'z.B. Villa in Bole', placeholderLocation: 'z.B. Addis Abeba, CMC' }
  },
  am: {
    nav: { home: 'መነሻ', add: 'ማስታወቂያ ይለጥፉ', login: 'ግባ' },
    home: { title: 'የህልምዎን ቤት ያግኙ', search: 'ቦታ ይፈልጉ...', all: 'ሁሉም', house: 'ቤቶች', apartment: 'አፓርታማዎች', noResults: 'ምንም ውጤት አልተገኘም' },
    details: { price: 'ዋጋ', rooms: 'ክፍሎች', contact: 'ፍላጎት አለዎት?', contactWhatsApp: 'በዋትስአፕ ያግኙ 💬', interestMessage: 'ሰላም! ስለዚህ ንብረት ማወቅ እፈልጋለሁ፦ ', back: 'ተመለስ', delete: 'አጥፋ 🗑️', confirmDelete: 'እርግጠኛ ነዎት?' },
    addForm: { title: 'ርዕስ', location: 'ቦታ', price: 'ዋጋ (ብር)', type: 'ዓይነት', rooms: 'ክፍሎች', description: 'መግለጫ', submit: 'አሁን ይለጥፉ 🚀', placeholderTitle: 'ለምሳሌ፡ ቦሌ የሚገኝ ቪላ', placeholderLocation: 'ለምሳሌ፡ አዲስ አበባ፣ ሲኤምሲ' }
  },
  om: {
    nav: { home: 'Manneen', add: 'Beeksisa Baasi', login: 'Seeni' },
    home: { title: 'Mana Abjuu Keessanii Argadhaa', search: 'Iddoo Barbaadi...', all: 'Hunda', house: 'Goojjoo', apartment: 'Appaartamaa', noResults: 'Wanti argame hin jiru' },
    details: { price: 'Gatii', rooms: 'Kutaa', contact: 'Fedhii Qabduu?', contactWhatsApp: 'WhatsApp n Nu argadhaa 💬', interestMessage: 'Akkam! Inni qabeenya kanaaf fedhii qaba: ', back: 'Deebi’i', delete: 'Haquu 🗑️', confirmDelete: 'Mirkaneeffadhaa?' },
    addForm: { title: 'Mata-duree', location: 'Iddoo', price: 'Gatii (ETB)', type: 'Gosa', rooms: 'Kutaa', description: 'Ibsa', submit: 'Amma Baasi 🚀', placeholderTitle: 'fkn. Villaa Boolee', placeholderLocation: 'fkn. Finfinnee, CMC' }
  },
  ti: {
    nav: { home: 'ኣባይቲ', add: 'ምልክታ ቅረጽ', login: 'እቶ' },
    home: { title: 'ናይ ሕልሚ ገዛኹም ርከቡ', search: 'ቦታ ድለዩ...', all: 'ኩሉ', house: 'ገዛውቲ', apartment: 'ኣፓርታማ', noResults: 'ዝተረኽበ ውጽኢት የለን' },
    details: { price: 'ዋጋ', rooms: 'ክፍልታት', contact: 'ድሌት ኣለኩም?', contactWhatsApp: 'ብዋትስኣፕ ረኽቡና 💬', interestMessage: 'ሰላም! በዚ ንብረት እዚ ተገዳስነት ኣለኒ፦ ', back: 'ተመለስ', delete: 'ኣጥፊእካ 🗑️', confirmDelete: 'ርግጸኛ ዲኻ?' },
    addForm: { title: 'ኣርእስቲ', location: 'ቦታ', price: 'ዋጋ (ETB)', type: 'ዓይነት', rooms: 'ክፍልታት', description: 'መግለጺ', submit: 'ሕጂ ለጥፍ 🚀', placeholderTitle: 'ንኣብነት፡ ቦለ ዝርከብ ቪላ', placeholderLocation: 'ንኣብነት፡ ኣዲስ ኣበባ፡ ሲኤምሲ' }
  }, // <--- DIESES KOMMA WAR ENTSCHEIDEND!
  fr: {
    nav: { home: 'Propriétés', add: 'Publier', login: 'Connexion' },
    home: { title: 'Trouvez la maison de vos rêves', search: 'Rechercher un lieu...', all: 'Tous', house: 'Maisons', apartment: 'Appartements', noResults: 'Aucun résultat trouvé' },
    details: { price: 'Prix', rooms: 'Pièces', contact: 'Intéressé ?', contactWhatsApp: 'Chat WhatsApp 💬', interestMessage: 'Bonjour ! Je suis intéressé par cette propriété : ', back: 'Retour', delete: 'Supprimer 🗑️', confirmDelete: 'Êtes-vous sûr ?' },
    addForm: { title: 'Titre', location: 'Emplacement', price: 'Prix (ETB)', type: 'Type', rooms: 'Pièces', description: 'Description', submit: 'Publier maintenant 🚀', placeholderTitle: 'ex: Villa à Bole', placeholderLocation: 'ex: Addis-Abeba, CMC' }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

export default i18n