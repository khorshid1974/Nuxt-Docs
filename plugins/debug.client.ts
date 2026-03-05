export default defineNuxtPlugin((nuxtApp) => {
    const i18n = nuxtApp.$i18n

    if (import.meta.client && i18n) {
        console.log('--- Docus Debug Intialized ---')
        console.log('Initial Locale:', i18n.locale.value)

        watch(() => i18n.locale.value, (newVal, oldVal) => {
            console.log('--- Locale Changed ---')
            console.log('From:', oldVal, 'To:', newVal)
            console.trace('Locale change trace')
        })

        const router = useRouter()
        router.beforeEach((to, from, next) => {
            console.log('--- Router Navigating ---')
            console.log('From:', from.path)
            console.log('To:', to.path)
            next()
        })
    }
})
