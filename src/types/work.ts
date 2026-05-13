import type { Locale } from '../i18n/locales'

export type WorkCategoryId =
  | UsageCategoryId
  | CraftCategoryId

export type UsageCategoryId = 'home' | 'jewelry' | 'pet-goods' | 'bags' | 'gifts' | 'charms'

export type CraftCategoryId = 'tatting' | 'crochet' | 'macrame' | 'knitting' | 'silk-wrapped'

export type LocalizedText = Record<Locale, string>

export interface RawWorkCategory {
  id: WorkCategoryId
  label: LocalizedText
  description: LocalizedText
}

export interface WorkCategory {
  id: WorkCategoryId
  label: string
  description: string
}

export interface RawUsageCategory extends RawWorkCategory {
  id: UsageCategoryId
}

export interface UsageCategory extends WorkCategory {
  id: UsageCategoryId
}

export interface RawCraftCategory extends RawWorkCategory {
  id: CraftCategoryId
}

export interface CraftCategory extends WorkCategory {
  id: CraftCategoryId
}

export interface RawWorkImage {
  src?: string
  alt: LocalizedText
  gradient: string
}

export interface WorkImage {
  src?: string
  alt: string
  gradient: string
}

export interface RawWorkVariant {
  id: string
  label: LocalizedText
  imageIndex: number
}

export interface WorkVariant {
  id: string
  label: string
  imageIndex: number
}

export interface RawWork {
  slug: string
  name: LocalizedText
  usageCategory: UsageCategoryId
  craftCategory: CraftCategoryId
  description: LocalizedText
  images: RawWorkImage[]
  videoSrc?: string
  videoSrcs?: string[]
  youtubeVideoId?: string
  variants?: RawWorkVariant[]
  featured: boolean
  etsyUrl?: string
  inquiryUrl?: string
  socialUrl?: string
}

export interface Work {
  slug: string
  name: string
  usageCategory: UsageCategory
  craftCategory: CraftCategory
  description: string
  images: WorkImage[]
  videoSrc?: string
  videoSrcs?: string[]
  youtubeVideoId?: string
  variants?: WorkVariant[]
  featured: boolean
  etsyUrl?: string
  inquiryUrl?: string
  socialUrl?: string
}

export interface WorkCta {
  label: string
  href: string
  type: 'etsy' | 'inquiry' | 'social'
}
