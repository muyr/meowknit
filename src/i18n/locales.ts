export const locales = ['zh-CN', 'en'] as const

export type Locale = (typeof locales)[number]

export const DEFAULT_LOCALE: Locale = 'zh-CN'

export const uiCopy = {
  'zh-CN': {
    languageName: '简体中文',
    switchTo: 'English',
    navHome: '首页',
    navAbout: '关于',
    navWorks: '作品集',
    navEtsy: 'Etsy店铺',
    navMarket: '集市',
    etsyShopUrl: 'https://www.etsy.com/shop/meowknit',
    heroEyebrow: '手工作品集',
    heroTitle: '一织猫',
    heroIntro:
      '给毛线、布料和慢手作留一片安静的展示空间。这里收集 Meowknit 的针织、钩针和季节礼物，也欢迎通过 Etsy 或 Instagram 继续了解。',
    heroVisualLabel: '品牌头图',
    heroLogoAlt: 'Meowknit 一织猫品牌 logo',
    heroTextureLabel: '一织猫 · soft handmade textures',
    heroCountLabel: '类手工作品雏形',
    aboutEyebrow: 'About',
    aboutTitle: '关于一织猫',
    aboutBody:
      '一织猫是一个慢慢生长的手工品牌，关注柔软材质、日常陪伴和带一点猫咪性格的小细节。这里先记录作品，也记录每一次上新前的手作温度。',
    marketEyebrow: 'Market',
    marketTitle: '近期集市',
    marketBody:
      '这里会记录一织猫参加的线下集市、快闪和节日活动。MVP 阶段先保留这个页面，后续可以加入时间、地点和摊位信息。',
    languageSwitcherLabel: '语言切换',
    categoryNavLabel: '作品分类',
    allWorks: '全部作品',
    portfolioEyebrow: '作品集',
    portfolioTitle: '精选作品与作品集',
    featuredLabel: '精选',
    detailClose: '关闭',
    detailImageLabel: '作品图片',
    ctaEtsy: '在 Etsy 查看',
    ctaInquiry: '咨询定制',
    ctaSocial: '关注 Instagram',
    categoryFallback: '作品',
    footerText: 'Meowknit · 慢慢更新的手工作品集',
    instagramLabel: 'Instagram',
  },
  en: {
    languageName: 'English',
    switchTo: '简体中文',
    navHome: 'Home',
    navAbout: 'About',
    navWorks: 'Works',
    navEtsy: 'Etsy Shop',
    navMarket: 'Markets',
    etsyShopUrl: 'https://www.etsy.com/shop/meowknit',
    heroEyebrow: 'Handmade portfolio',
    heroTitle: 'Meowknit',
    heroIntro:
      'A calm home for yarn, fabric, and slow handmade work. Explore Meowknit knits, crochet pieces, and seasonal gifts, then continue through Etsy or Instagram.',
    heroVisualLabel: 'Brand visual',
    heroLogoAlt: 'Meowknit brand logo',
    heroTextureLabel: 'Meowknit · soft handmade textures',
    heroCountLabel: 'handmade categories in progress',
    aboutEyebrow: 'About',
    aboutTitle: 'About Meowknit',
    aboutBody:
      'Meowknit is a slowly growing handmade brand shaped by soft materials, everyday companionship, and small cat-like details. This site keeps the work visible while the next pieces are being made.',
    marketEyebrow: 'Market',
    marketTitle: 'Upcoming Markets',
    marketBody:
      'This page will collect Meowknit offline markets, pop-ups, and seasonal events. For the MVP, it is a placeholder ready for future dates, locations, and booth notes.',
    languageSwitcherLabel: 'Language switcher',
    categoryNavLabel: 'Work categories',
    allWorks: 'All works',
    portfolioEyebrow: 'Portfolio',
    portfolioTitle: 'Featured Works and Gallery',
    featuredLabel: 'Featured',
    detailClose: 'Close',
    detailImageLabel: 'Work images',
    ctaEtsy: 'View on Etsy',
    ctaInquiry: 'Inquire about custom work',
    ctaSocial: 'Follow on Instagram',
    categoryFallback: 'Work',
    footerText: 'Meowknit · A slowly growing handmade portfolio',
    instagramLabel: 'Instagram',
  },
} satisfies Record<Locale, Record<string, string>>

export type UiCopy = (typeof uiCopy)[Locale]
