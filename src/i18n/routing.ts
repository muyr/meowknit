import { DEFAULT_LOCALE, locales, type Locale } from './locales'

export type PageId = 'home' | 'about' | 'works' | 'market'

const pages: PageId[] = ['home', 'about', 'works', 'market']

export function getLocaleFromPath(pathname: string): Locale {
  const firstSegment = pathname.split('/').filter(Boolean)[0]

  return locales.find((locale) => locale === firstSegment) ?? DEFAULT_LOCALE
}

export function getPageFromPath(pathname: string): PageId {
  const [, maybePage] = pathname.split('/').filter(Boolean)

  return pages.find((page) => page === maybePage) ?? 'home'
}

export function getWorkSlugFromPath(pathname: string): string | null {
  const [, maybePage, maybeSlug] = pathname.split('/').filter(Boolean)

  return maybePage === 'works' && maybeSlug ? maybeSlug : null
}

export function getLocalePath(locale: Locale, page: PageId = 'home', workSlug?: string): string {
  if (page === 'home') {
    return `/${locale}`
  }

  if (page === 'works' && workSlug) {
    return `/${locale}/works/${workSlug}`
  }

  return `/${locale}/${page}`
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'zh-CN' ? 'en' : 'zh-CN'
}
