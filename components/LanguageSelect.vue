
<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

function getEmojiFlag(localeCode: string): string {
  // Manual overrides for specific locales to match user request
  // Arabic (ar) -> Iraq (IQ)
  // English (en) -> United States (US)
  // Kurdish (ku) -> Iraq (IQ)
  const manualMap: Record<string, string> = {
    'ar': 'iq',
    'ar-IQ': 'iq',
    'en': 'us',
    'en-US': 'us',
    'ku': 'iq',
    'ku-IQ': 'iq'
  }

  if (manualMap[localeCode]) {
    return countryCodeToEmoji(manualMap[localeCode])
  }

  // Fallback to default logic for other languages
  const languageToCountry: Record<string, string> = {
    bn: 'bd', // Bengali -> Bangladesh
    ca: 'es', // Catalan -> Spain
    cs: 'cz', // Czech -> Czech Republic
    da: 'dk', // Danish -> Denmark
    el: 'gr', // Greek -> Greece
    et: 'ee', // Estonian -> Estonia
    he: 'il', // Hebrew -> Israel
    hi: 'in', // Hindi -> India
    hy: 'am', // Armenian -> Armenia
    ja: 'jp', // Japanese -> Japan
    kk: 'kz', // Kazakh -> Kazakhstan
    km: 'kh', // Khmer -> Cambodia
    ko: 'kr', // Korean -> South Korea
    ky: 'kg', // Kyrgyz -> Kyrgyzstan
    lb: 'lu', // Luxembourgish -> Luxembourg
    ms: 'my', // Malay -> Malaysia
    nb: 'no', // Norwegian Bokmål -> Norway
    sl: 'si', // Slovenian -> Slovenia
    sv: 'se', // Swedish -> Sweden
    uk: 'ua', // Ukrainian -> Ukraine
    ur: 'pk', // Urdu -> Pakistan
    vi: 'vn', // Vietnamese -> Vietnam
    id: 'id', // Indonesian -> Indonesia
  }

  const baseLanguage = localeCode.split('-')[0]?.toLowerCase() || localeCode
  const countryCode = languageToCountry[baseLanguage] || localeCode.replace(/^.*-/, '').slice(0, 2)
  
  return countryCodeToEmoji(countryCode)
}

function countryCodeToEmoji(countryCode: string): string {
  return countryCode.toUpperCase()
    .split('')
    .map(char => String.fromCodePoint(0x1F1A5 + char.charCodeAt(0)))
    .join('')
}
</script>

<template>
  <UPopover
    mode="hover"
    :content="{ align: 'end' }"
  >
    <UButton
      color="neutral"
      variant="ghost"
      class="size-8"
    >
      <template #trailing>
        <span class="text-lg">
          {{ getEmojiFlag(locale) }}
        </span>
      </template>
    </UButton>

    <template #content>
      <ul class="flex flex-col">
        <li
          v-for="localeItem in locales"
          :key="localeItem.code"
        >
          <NuxtLink
            class="flex justify-between py-1.5 px-2 gap-1 hover:bg-muted"
            :to="switchLocalePath(localeItem.code) as string"
            :aria-label="localeItem.name"
          >
            <span class="text-sm">
              {{ localeItem.name }}
            </span>
            <span class="size-5 text-center">
              {{ getEmojiFlag(localeItem.code) }}
            </span>
          </NuxtLink>
        </li>
      </ul>
    </template>
  </UPopover>
</template>
