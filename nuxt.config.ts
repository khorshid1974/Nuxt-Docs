import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt-studio", "@nuxtjs/i18n"],
  i18n: {
    locales: [
      { code: 'en', name: 'English', iso: 'en-US', file: 'en.json' },
      { code: 'ar', name: 'العربية', iso: 'ar-IQ', dir: 'rtl', file: 'ar.json' },
      { code: 'ku', name: 'Kurdish', iso: 'ku-IQ', dir: 'rtl', file: 'ku.json' }
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    }
  }
})