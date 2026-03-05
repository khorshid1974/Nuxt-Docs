export default defineNuxtPlugin((nuxtApp) => {
  const i18n = nuxtApp.$i18n as any
  
  if (!i18n) return

  // Watch for locale changes and refresh content
  if (import.meta.client) {
    watch(() => i18n.locale.value, async (newLocale, oldLocale) => {
      if (oldLocale && newLocale !== oldLocale) {
        // Force content refresh by clearing cache
        if (nuxtApp.$preview) {
          await nuxtApp.$preview.refresh()
        }
        
        // Refresh current page data
        await nuxtApp.callHook('page:loading:start')
        await nuxtApp.callHook('page:loading:end')
      }
    })
  }
})
