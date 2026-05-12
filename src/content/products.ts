import type { RawWork } from '../types/work'

const instagramUrl = 'https://www.instagram.com/meowknit'

export const products: RawWork[] = [
  {
    slug: 'momo-cardigan',
    name: {
      'zh-CN': 'Momo 奶油短开衫',
      en: 'Momo Cream Cropped Cardigan',
    },
    usageCategory: 'gifts',
    craftCategory: 'knitting',
    description: {
      'zh-CN':
        '奶油白与蜜桃粉交织的短款开衫，适合春秋叠穿，也适合作为 MeowKnit 的品牌代表款。',
      en: 'A cropped cardigan in creamy white and peach pink, made for spring and autumn layering and a signature MeowKnit look.',
    },
    images: [
      {
        alt: {
          'zh-CN': '奶油白短款针织开衫正面',
          en: 'Front view of the cream cropped knit cardigan',
        },
        gradient: 'linear-gradient(135deg, #f8decf 0%, #fff6e9 48%, #d68e7a 100%)',
      },
      {
        alt: {
          'zh-CN': '蜜桃粉短款针织开衫细节',
          en: 'Peach pink detail of the cropped knit cardigan',
        },
        gradient: 'linear-gradient(135deg, #d68e7a 0%, #f8c8bc 48%, #fff6e9 100%)',
      },
    ],
    youtubeVideoId: 'aqz-KE-bpKQ',
    variants: [
      {
        id: 'cream',
        label: {
          'zh-CN': '奶油白',
          en: 'Cream White',
        },
        imageIndex: 0,
      },
      {
        id: 'peach',
        label: {
          'zh-CN': '蜜桃粉',
          en: 'Peach Pink',
        },
        imageIndex: 1,
      },
    ],
    featured: true,
    etsyUrl: 'https://www.etsy.com/shop/meowknit',
  },
  {
    slug: 'ginger-market-bag',
    name: {
      'zh-CN': '姜糖 Market Bag',
      en: 'Ginger Candy Market Bag',
    },
    usageCategory: 'bags',
    craftCategory: 'crochet',
    description: {
      'zh-CN': '轻盈的钩针网袋，带有姜糖色肩带和小猫吊牌，适合放书、花束或周末小物。',
      en: 'A lightweight crochet mesh bag with ginger-toned straps and a small cat charm, ready for books, flowers, or weekend essentials.',
    },
    images: [
      {
        alt: {
          'zh-CN': '姜糖色钩针网袋',
          en: 'Ginger-toned crochet market bag',
        },
        gradient: 'linear-gradient(135deg, #c77a47 0%, #f4c08f 52%, #fff2dc 100%)',
      },
    ],
    featured: true,
    etsyUrl: 'https://www.etsy.com/shop/meowknit',
  },
  {
    slug: 'window-sun-coaster-set',
    name: {
      'zh-CN': '窗边阳光杯垫组',
      en: 'Window Sun Coaster Set',
    },
    usageCategory: 'home',
    craftCategory: 'crochet',
    description: {
      'zh-CN': '一组六枚暖色杯垫，灵感来自午后窗边的阳光斑点，可用于餐桌、书桌或礼盒搭配。',
      en: 'A set of six warm-toned coasters inspired by afternoon sunlight near the window, suited for tables, desks, or gift boxes.',
    },
    images: [
      {
        alt: {
          'zh-CN': '暖色手工杯垫组',
          en: 'Warm handmade coaster set',
        },
        gradient: 'linear-gradient(135deg, #f7d27e 0%, #fff0be 48%, #b77853 100%)',
      },
    ],
    featured: true,
    inquiryUrl: instagramUrl,
  },
  {
    slug: 'cat-cloud-bandana',
    name: {
      'zh-CN': '猫云朵小领巾',
      en: 'Cat Cloud Bandana',
    },
    usageCategory: 'pet-goods',
    craftCategory: 'crochet',
    description: {
      'zh-CN': '轻薄柔软的宠物小领巾，使用云朵边钩法，适合日常拍照和节日造型。',
      en: 'A light and soft pet bandana with cloud-like crochet edging, made for everyday photos and seasonal looks.',
    },
    images: [
      {
        alt: {
          'zh-CN': '云朵边宠物小领巾',
          en: 'Pet bandana with cloud crochet edging',
        },
        gradient: 'linear-gradient(135deg, #a7c6d9 0%, #f7fbff 50%, #dfb1a6 100%)',
      },
    ],
    featured: false,
    socialUrl: instagramUrl,
  },
  {
    slug: 'tiny-latte-bunny',
    name: {
      'zh-CN': '拿铁色迷你兔',
      en: 'Tiny Latte Bunny',
    },
    usageCategory: 'gifts',
    craftCategory: 'crochet',
    description: {
      'zh-CN': '掌心大小的迷你兔玩偶，配有可拆卸小围巾，是 MeowKnit 礼物系列的温柔角色。',
      en: 'A palm-sized bunny plush with a removable tiny scarf, a gentle character from the MeowKnit gift collection.',
    },
    images: [
      {
        alt: {
          'zh-CN': '拿铁色迷你兔毛线玩偶',
          en: 'Latte-colored tiny bunny yarn plush',
        },
        gradient: 'linear-gradient(135deg, #8d664f 0%, #c9a07e 48%, #f8e5cf 100%)',
      },
    ],
    featured: true,
    etsyUrl: 'https://www.etsy.com/shop/meowknit',
  },
  {
    slug: 'winter-starlight-ornament',
    name: {
      'zh-CN': '冬日星光挂饰',
      en: 'Winter Starlight Ornament',
    },
    usageCategory: 'home',
    craftCategory: 'tatting',
    description: {
      'zh-CN': '带金线细节的星星挂饰，可挂在包上、门把手或节日树枝上，接受颜色定制咨询。',
      en: 'A star ornament with fine golden details, made for bags, door handles, or holiday branches, with color customization available by inquiry.',
    },
    images: [
      {
        alt: {
          'zh-CN': '金线星星手工挂饰',
          en: 'Handmade star ornament with golden thread',
        },
        gradient: 'linear-gradient(135deg, #6f8792 0%, #f5d58a 48%, #fffaf0 100%)',
      },
    ],
    featured: false,
    inquiryUrl: instagramUrl,
  },
]
