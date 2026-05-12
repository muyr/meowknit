import type { Locale } from '../i18n/locales'

export type WorkCategoryId =
  | 'knitwear'
  | 'crochet-bag'
  | 'home-decor'
  | 'pet-accessory'
  | 'miniature'
  | 'seasonal-gift'

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

export interface RawWork {
  slug: string
  name: LocalizedText
  category: WorkCategoryId
  description: LocalizedText
  images: RawWorkImage[]
  featured: boolean
  etsyUrl?: string
  inquiryUrl?: string
  socialUrl?: string
}

export interface Work {
  slug: string
  name: string
  category: WorkCategoryId
  description: string
  images: WorkImage[]
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
