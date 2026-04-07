import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    nav: { home: 'Home', listings: 'My Listings', profile: 'Profile', add: 'Post Ad', login: 'Login' },
    home: { title: 'Find your dream home', search: 'Search location...', all: 'All', house: 'Houses', apartment: 'Apartments', noResults: 'No results found' },
    loginPage: { title: 'Login', email: 'Email Address', password: 'Password', submit: 'Enter Portal 🚀', noAccount: "Don't have an account?", signup: 'Sign Up' },
    registerPage: { title: 'Create Account', name: 'Full Name / Business Name', email: 'Email Address', password: 'Password', rolePrivate: 'Private', roleBroker: 'Broker', roleCompany: 'Company', submit: 'Sign Up Now 🚀', alreadyAccount: 'Already have an account?', login: 'Login here' },
    details: { price: 'Price', rooms: 'Rooms', contact: 'Interested?', contactWhatsApp: 'WhatsApp Chat 💬', interestMessage: 'Hello! I am interested in: ', back: 'Details', delete: 'Delete', confirmDelete: 'Are you sure?' },
    addForm: { title: 'Title', location: 'Location', price: 'Price (ETB)', type: 'Type', rooms: 'Rooms', description: 'Description', submit: 'Post Now 🚀', placeholderTitle: 'e.g. Villa in Bole', placeholderLocation: 'e.g. Addis Ababa', submitSuccess: 'Property posted! 📸' }
  },
  de: {
    nav: { home: 'Start', listings: 'Meine Inserate', profile: 'Profil', add: 'Anzeige veröffentlichen', login: 'Login' },
    home: { title: 'Finde dein Traumhaus', search: 'Ort suchen...', all: 'Alle', house: 'Häuser', apartment: 'Wohnungen', noResults: 'Nichts gefunden' },
    loginPage: { title: 'Login', email: 'E-Mail Adresse', password: 'Passwort', submit: 'Einloggen 🚀', noAccount: 'Noch kein Konto?', signup: 'Registrieren' },
    registerPage: { title: 'Konto erstellen', name: 'Vollständiger Name / Firma', email: 'E-Mail Adresse', password: 'Passwort', rolePrivate: 'Privat', roleBroker: 'Makler', roleCompany: 'Firma', submit: 'Jetzt registrieren 🚀', alreadyAccount: 'Bereits ein Konto?', login: 'Hier einloggen' },
    details: { price: 'Preis', rooms: 'Zimmer', contact: 'Interesse?', contactWhatsApp: 'WhatsApp Kontakt 💬', interestMessage: 'Hallo! Ich interessiere mich für: ', back: 'Details', delete: 'Löschen', confirmDelete: 'Bist du sicher?' },
    addForm: { title: 'Titel', location: 'Ort', price: 'Preis (ETB)', type: 'Typ', rooms: 'Zimmer', description: 'Beschreibung', submit: 'Jetzt posten 🚀', placeholderTitle: 'z.B. Villa in Bole', placeholderLocation: 'z.B. Addis Abeba', submitSuccess: 'Inserat erstellt! 📸' }
  },
  am: {
    nav: { home: 'መነሻ', listings: 'የኔ ማስታወቂያዎች', profile: 'ፕሮፋይል', add: 'ማስታወቂያ ይለጥፉ', login: 'ግባ' },
    home: { title: 'የህልምዎን ቤት ያግኙ', search: 'ቦታ ይፈልጉ...', all: 'ሁሉም', house: 'ቤቶች', apartment: 'አፓርታማዎች', noResults: 'ምንም ውጤት አልተገኘም' },
    loginPage: { title: 'መግቢያ', email: 'ኢሜይል', password: 'የይለፍ ቃል', submit: 'ግባ 🚀', noAccount: 'አካውንት የለዎትም?', signup: 'ተመዝገብ' },
    registerPage: { title: 'አካውንት ይክፈቱ', name: 'ሙሉ ስም / የድርጅት ስም', email: 'ኢሜይል', password: 'የይለፍ ቃል', rolePrivate: 'ግለሰብ', roleBroker: 'ደላላ', roleCompany: 'ሪል ስቴት', submit: 'አሁን ይመዝገቡ 🚀', alreadyAccount: 'አካውንት አለዎት?', login: 'እዚህ ይግቡ' },
    details: { price: 'ዋጋ', rooms: 'ክፍሎች', contact: 'ፍላጎት አለዎት?', contactWhatsApp: 'በዋትስአፕ ያግኙ 💬', interestMessage: 'ሰላም! ስለዚህ ንብረት ማወቅ እፈልጋለሁ፦ ', back: 'ዝርዝር', delete: 'አጥፋ', confirmDelete: 'እርግጠኛ ነዎት?' },
    addForm: { title: 'ርዕስ', location: 'ቦታ', price: 'ዋጋ (ብር)', type: 'ዓይነት', rooms: 'ክፍሎች', description: 'መግለጫ', submit: 'አሁን ይለጥፉ 🚀', placeholderTitle: 'ለምሳሌ፡ ቦሌ የሚገኝ ቪላ', placeholderLocation: 'ለምሳሌ፡ አዲስ አበባ', submitSuccess: 'ተሳክቷል! 📸' }
  },
  om: {
    nav: { home: 'Madda', listings: 'Koo', profile: 'Proofayilii', add: 'Beeksisa Baasi', login: 'Seeni' },
    home: { title: 'Mana Abjuu Keessanii Argadhaa', search: 'Iddoo Barbaadi...', all: 'Hunda', house: 'Goojjoo', apartment: 'Appaartamaa', noResults: 'Hin argamne' },
    loginPage: { title: 'Seensaa', email: 'Iimeelii', password: 'Jecha icciitii', submit: 'Seeni 🚀', noAccount: 'Eenyummaa hin qabduu?', signup: 'Galmaa’i' },
    registerPage: { title: 'Eenyummaa Uumaa', name: 'Maqaa Guutuu', email: 'Iimeelii', password: 'Jecha icciitii', rolePrivate: 'Dhuunfaa', roleBroker: 'Dallalaa', roleCompany: 'Kumpaanii', submit: 'Amma Galmaa’i 🚀', alreadyAccount: 'Eenyummaa qabduu?', login: 'Asitti seeni' },
    details: { price: 'Gatii', rooms: 'Kutaa', contact: 'Fedhii Qabduu?', contactWhatsApp: 'WhatsApp 💬', interestMessage: 'Akkam! fedhii qaba: ', back: 'Bal’ina', delete: 'Haquu', confirmDelete: 'Mirkaneeffadhaa?' },
    addForm: { title: 'Mata-duree', location: 'Iddoo', price: 'Gatii', type: 'Gosa', rooms: 'Kutaa', description: 'Ibsa', submit: 'Amma Baasi 🚀', placeholderTitle: 'fkn. Boolee', placeholderLocation: 'fkn. Finfinnee', submitSuccess: 'Milkaa’eera! 📸' }
  },
  ti: {
    nav: { home: 'መበገሲ', listings: 'ናይ ባዕለይ', profile: 'ፕሮፋይል', add: 'ምልክታ ቅረጽ', login: 'እቶ' },
    home: { title: 'ናይ ሕልሚ ገዛኹም ርከቡ', search: 'ቦታ ድለዩ...', all: 'ኩሉ', house: 'ገዛ', apartment: 'ኣፓርታማ', noResults: 'የለን' },
    loginPage: { title: 'መእተዊ', email: 'ኢሜይል', password: 'መሕለፊ ቃል', submit: 'እቶ 🚀', noAccount: 'አካውንት የብልካን?', signup: 'ተመዝገብ' },
    registerPage: { title: 'አካውንት ፍጠሩ', name: 'ምሉእ ስም / ስም ትካል', email: 'ኢሜይል', password: 'መሕለፊ ቃል', rolePrivate: 'ውልቀሰብ', roleBroker: 'ደላላ', roleCompany: 'ትካል', submit: 'ሕጂ ተመዝገብ 🚀', alreadyAccount: 'አካውንት አለካ?', login: 'አብዚ እቶ' },
    details: { price: 'ዋጋ', rooms: 'ክፍልታት', contact: 'ድሌት ኣለኩም?', contactWhatsApp: 'ብዋትስኣፕ 💬', interestMessage: 'ሰላም! ተገዳስነት ኣለኒ፦ ', back: 'ዝርዝር', delete: 'ኣጥፊእካ', confirmDelete: 'ርግጸኛ ዲኻ?' },
    addForm: { title: 'ኣርእስቲ', location: 'ቦታ', price: 'ዋጋ', type: 'ዓይነት', rooms: 'ክፍልታት', description: 'መግለጺ', submit: 'ሕጂ ለጥፍ 🚀', placeholderTitle: 'ንኣብነት፡ ቦለ', placeholderLocation: 'ንኣብነት፡ ኣዲስ ኣበባ', submitSuccess: 'ተሳኪዑ! 📸' }
  },
  fr: {
    nav: { home: 'Accueil', listings: 'Mes Annonces', profile: 'Profil', add: 'Publier', login: 'Connexion' },
    home: { title: 'Trouvez la maison de vos rêves', search: 'Lieu...', all: 'Tous', house: 'Maisons', apartment: 'Appartements', noResults: 'Aucun résultat' },
    loginPage: { title: 'Connexion', email: 'Email', password: 'Mot de passe', submit: 'Entrer 🚀', noAccount: 'Pas de compte ?', signup: "S'inscrire" },
    registerPage: { title: 'Créer un compte', name: 'Nom complet / Entreprise', email: 'Email', password: 'Mot de passe', rolePrivate: 'Particulier', roleBroker: 'Agent', roleCompany: 'Société', submit: "S'inscrire maintenant 🚀", alreadyAccount: 'Déjà un compte ?', login: 'Se connecter' },
    details: { price: 'Prix', rooms: 'Pièces', contact: 'Intéressé ?', contactWhatsApp: 'WhatsApp 💬', interestMessage: 'Bonjour ! Je suis intéressé par : ', back: 'Détails', delete: 'Supprimer', confirmDelete: 'Êtes-vous sûr ?' },
    addForm: { title: 'Titre', location: 'Lieu', price: 'Prix', type: 'Type', rooms: 'Pièces', description: 'Description', submit: 'Publier 🚀', placeholderTitle: 'ex: Villa à Bole', placeholderLocation: 'ex: Addis-Abeba', submitSuccess: 'Publié ! 📸' }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

export default i18n