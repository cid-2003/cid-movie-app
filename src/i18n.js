import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importation des ressources de traduction
import enTranslation from './locales/en/translation.json';
import frTranslation from './locales/fr/translation.json';
import esTranslation from './locales/es/translation.json';

// Ressources de traduction simplifiées
const resources = {
  en: { translation: enTranslation },
  fr: { translation: frTranslation },
  es: { translation: esTranslation }
};

i18n
  // Détecte la langue de l'utilisateur
  .use(LanguageDetector)
  
  // Passe l'instance i18n à react-i18next
  .use(initReactI18next)
  
  // Initialisation de la configuration
  .init({
    resources, 
    fallbackLng: 'en',
    lng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false 
    },
    
    detection: {
      // Ordre de recherche: local storage, puis navigateur
      order: ['localStorage', 'navigator'], 
      // Stocke la dernière langue choisie
      caches: ['localStorage']
    }
  });

export default i18n;