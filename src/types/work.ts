export type WorkCategoryId =
  | 'knitwear'
  | 'crochet-bag'
  | 'home-decor'
  | 'pet-accessory'
  | 'miniature'
  | 'seasonal-gift'

export interface WorkCategory {
  id: WorkCategoryId
  label: string
  description: string
}

export interface WorkImage {
  src?: string
  alt: string
  gradient: string
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
