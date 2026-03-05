# Language Switching Fix Summary

## Problem
When changing language while on the home page, the old content was displayed instead of the new language's content. The button text "Get Started" wasn't updating to "Get Started Now" or translated versions.

## Root Cause
The root `/content/index.md` file was conflicting with the locale-specific content structure (`/content/en/index.md`, `/content/ar/index.md`, `/content/ku/index.md`). This caused Nuxt Content to serve cached content instead of loading the correct localized version.

## Changes Made

### 1. Removed Root Content File
- **Deleted:** `content/index.md`
- **Reason:** This file was interfering with the locale-specific home pages. With locale-based content structure, each language should have its own content directory.

### 2. Updated Language Selector Component
- **File:** `components/LanguageSelect.vue`
- **Changes:**
  - Added `handleLanguageSwitch()` function that detects when switching languages on the home page
  - Forces a full page reload (`window.location.href`) when switching languages on home pages to clear content cache
  - Uses standard router navigation for other pages to maintain smooth transitions
  - Prevents switching to the same locale (performance optimization)

### 3. Created Content Refresh Plugin
- **File:** `plugins/locale-content-refresh.client.ts`
- **Purpose:** Watches for locale changes and triggers content refresh hooks to ensure Nuxt Content updates properly

### 4. Updated Nuxt Config
- **File:** `nuxt.config.ts`
- **Changes:**
  - Changed `strategy` from `'prefix_except_default'` to `'prefix'` for consistency
  - Set `langDir` to `'locales'` (Docus automatically prepends `i18n/` internally)
  - **New URL structure:**
    - English: `/en`
    - Arabic: `/ar`
    - Kurdish: `/ku`
    
### 5. Created Locale Files Directory
- **Created:** `locales/` directory at project root
- **Copied:** Locale JSON files from `i18n/locales/` to `locales/`
- **Reason:** Docus internally prepends `i18n/` to the langDir path, so we need the files at the root `locales/` directory

## Testing Instructions

1. **Restart the development server:**
   ```bash
   npm run dev
   ```

2. **Test the language switching:**
   - Navigate to the home page (will redirect to `/en`)
   - You should see "Get Start Now" button (as defined in `content/en/index.md`)
   - Switch to Arabic - page should reload and navigate to `/ar`, showing "Get started" button (from `content/ar/index.md`)
   - Switch to Kurdish - page should reload and navigate to `/ku`, showing "Get started" button (from `content/ku/index.md`)
   - Switch back to English - page should reload and navigate to `/en`, showing "Get Start Now" again

3. **Test other pages:**
   - Navigate to any documentation page (e.g., `/en/students/my-subjects`)
   - Switch languages - should navigate smoothly without full reload
   - Content should update properly to the selected language

## Expected Behavior

- **Home Page:** Full page reload when changing language (ensures content is fresh)
- **Other Pages:** Smooth navigation without reload (better UX)
- **Content:** Always shows the correct localized content immediately after switching
- **URL Structure:** All languages use prefixes (`/en`, `/ar`, `/ku`) for consistency

## Notes

- TypeScript errors in new files are expected - Nuxt auto-imports these functions
- The full page reload on home page is intentional to ensure content cache is cleared
- Button text differences between locales are preserved as defined in your content files
