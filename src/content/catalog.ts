import { craftCategories as rawCraftCategories } from './craftCategories'
import { products } from './products'
import { usageCategories as rawUsageCategories } from './usageCategories'
import { DEFAULT_LOCALE, uiCopy, type Locale } from '../i18n/locales'
import type {
  CraftCategory,
  CraftCategoryId,
  RawCraftCategory,
  RawUsageCategory,
  RawWork,
  UsageCategory,
  UsageCategoryId,
  Work,
  WorkCta,
  WorkImage,
  WorkVariant,
} from '../types/work'

const fallbackSocialUrl = 'https://www.instagram.com/meowknit'

export { products }
export { rawCraftCategories, rawUsageCategories }

function localizeImage(image: RawWork['images'][number], locale: Locale): WorkImage {
  return {
    src: image.src,
    alt: image.alt[locale],
    gradient: image.gradient,
  }
}

function localizeVariant(variant: NonNullable<RawWork['variants']>[number], locale: Locale): WorkVariant {
  return {
    id: variant.id,
    label: variant.label[locale],
    imageIndex: variant.imageIndex,
  }
}

function localizeUsageCategory(category: RawUsageCategory, locale: Locale): UsageCategory {
  return {
    id: category.id,
    label: category.label[locale],
    description: category.description[locale],
  }
}

function localizeCraftCategory(category: RawCraftCategory, locale: Locale): CraftCategory {
  return {
    id: category.id,
    label: category.label[locale],
    description: category.description[locale],
  }
}

function requireUsageCategory(id: UsageCategoryId, categories: UsageCategory[]): UsageCategory {
  const category = categories.find((candidate) => candidate.id === id)

  if (!category) {
    throw new Error(`Unknown usage category: ${id}`)
  }

  return category
}

function requireCraftCategory(id: CraftCategoryId, categories: CraftCategory[]): CraftCategory {
  const category = categories.find((candidate) => candidate.id === id)

  if (!category) {
    throw new Error(`Unknown craft category: ${id}`)
  }

  return category
}

function localizeProduct(
  product: RawWork,
  locale: Locale,
  usageCategories: UsageCategory[],
  craftCategories: CraftCategory[],
): Work {
  return {
    slug: product.slug,
    name: product.name[locale],
    usageCategory: requireUsageCategory(product.usageCategory, usageCategories),
    craftCategory: requireCraftCategory(product.craftCategory, craftCategories),
    description: product.description[locale],
    images: product.images.map((image) => localizeImage(image, locale)),
    youtubeVideoId: product.youtubeVideoId,
    variants: product.variants?.map((variant) => localizeVariant(variant, locale)),
    featured: product.featured,
    etsyUrl: product.etsyUrl,
    inquiryUrl: product.inquiryUrl,
    socialUrl: product.socialUrl,
  }
}

export function getUsageCategories(locale: Locale): UsageCategory[] {
  return rawUsageCategories.map((category) => localizeUsageCategory(category, locale))
}

export function getCraftCategories(locale: Locale): CraftCategory[] {
  return rawCraftCategories.map((category) => localizeCraftCategory(category, locale))
}

export function getCategories(locale: Locale): UsageCategory[] {
  return getUsageCategories(locale)
}

export function getWorks(locale: Locale): Work[] {
  const usageCategories = getUsageCategories(locale)
  const craftCategories = getCraftCategories(locale)

  return products.map((product) =>
    localizeProduct(product, locale, usageCategories, craftCategories),
  )
}

export const usageCategories: UsageCategory[] = getUsageCategories(DEFAULT_LOCALE)
export const craftCategories: CraftCategory[] = getCraftCategories(DEFAULT_LOCALE)
export const categories: UsageCategory[] = usageCategories

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
