/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { en, zhHant } from 'vuetify/locale'
import { createI18n } from 'vue-i18n'
import enLocale from '@/locales/en'
import zhHantLocale from '@/locales/zhHant'

const messages = {
  en: {
    $vuetify: {
      ...en,
    },
    ...enLocale,
  },
  zhHant: {
    $vuetify: {
      ...zhHant,
    },
    ...zhHantLocale,
  },
}

export default createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: 'en',
  fallbackLocale: 'zhHant',
  messages,
})
