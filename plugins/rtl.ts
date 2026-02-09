export default defineNuxtPlugin((nuxtApp) => {
    const i18n = nuxtApp.$i18n as any

    if (!i18n) return

    const updateHead = (localeCode: string) => {
        // Logic: if 'dir' is 'rtl' in config OR hardcoded fallback
        const currentLocale = i18n.locales.value.find((l: any) => l.code === localeCode)
        const isRtl = currentLocale?.dir === 'rtl' || ['ar', 'ku', 'fa', 'he', 'ur', 'ckb'].includes(localeCode) || localeCode.startsWith('ar-') || localeCode.startsWith('ku-')

        const direction = isRtl ? 'rtl' : 'ltr'

        useHead({
            htmlAttrs: {
                dir: direction,
                lang: localeCode
            }
        })

        // Client-side forceful update
        if (import.meta.client) {
            document.documentElement.setAttribute('dir', direction)
            document.documentElement.setAttribute('lang', localeCode)
        }
    }

    // Initial set
    if (i18n.locale.value) {
        updateHead(i18n.locale.value)
    }

    // Watch for changes
    if (import.meta.client) {
        watch(() => i18n.locale.value, (newLocale) => {
            updateHead(newLocale)
        })
    }
})
