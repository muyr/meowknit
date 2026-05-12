import { categories as rawCategories } from './categories'
import { products } from './products'
import { DEFAULT_LOCALE, uiCopy, type Locale } from '../i18n/locales'
import type { RawWork, RawWorkCategory, Work, WorkCategory, WorkCta, WorkImage } from '../types/work'

const fallbackSocialUrl = 'https://www.instagram.com/meowknit'

export { products }
export { rawCategories }

function localizeImage(image: RawWork['images'][number], locale: Locale): WorkImage {
  return {
    src: image.src,
    alt: image.alt[locale],
    gradient: image.gradient,
  }
}

function localizeCategory(category: RawWorkCategory, locale: Locale): WorkCategory {
  return {
    id: category.id,
    label: category.label[locale],
    description: category.description[locale],
  }
}

function localizeProduct(product: RawWork, locale: Locale): Work {
  return {
    slug: product.slug,
    name: product.name[locale],
    category: product.category,
    description: product.description[locale],
    images: product.images.map((image) => localizeImage(image, locale)),
    featured: product.featured,
    etsyUrl: product.etsyUrl,
    inquiryUrl: product.inquiryUrl,
    socialUrl: product.socialUrl,
  }
}

export function getCategories(locale: Locale): WorkCategory[] {
  return rawCategories.map((category) => localizeCategory(category, locale))
}

export function getWorks(locale: Locale): Work[] {
  return products.map((product) => localizeProduct(product, locale))
}

export const categories: WorkCategory[] = getCategories(DEFAULT_LOCALE)

// The public UI still uses "work" language, while maintainers manage "products".
export const works: Work[] = getWorks(DEFAULT_LOCALE)

export function getWorkCta(work: Work, locale: Locale = DEFAULT_LOCALE): WorkCta {
  const copy = uiCopy[locale]

  if (work.etsyUrl) {
    return {
      label: copy.ctaEtsy,
      href: work.etsyUrl,
      type: 'etsy',
    }
  }

  if (work.inquiryUrl) {
    return {
      label: copy.ctaInquiry,
      href: work.inquiryUrl,
      type: 'inquiry',
    }
  }

  return {
    label: copy.ctaSocial,
    href: work.socialUrl ?? fallbackSocialUrl,
    type: 'social',
  }
}
