import type { Work, WorkCategory, WorkCta } from '../types/work'

const instagramUrl = 'https://www.instagram.com/meowknit'

export const categories: WorkCategory[] = [
  {
    id: 'knitwear',
    label: '针织服饰',
    description: '柔软、贴身、适合日常层搭的手工针织。',
  },
  {
    id: 'crochet-bag',
    label: '钩针包袋',
    description: '小容量但很有存在感的出门配饰。',
  },
  {
    id: 'home-decor',
    label: '家居织物',
    description: '让角落变温暖的桌垫、挂饰和收纳。',
  },
  {
    id: 'pet-accessory',
    label: '宠物配件',
    description: '给猫猫狗狗的小围巾和拍照小物。',
  },
  {
    id: 'miniature',
    label: '迷你玩偶',
    description: '小尺寸的毛线朋友，适合收藏和送礼。',
  },
  {
    id: 'seasonal-gift',
    label: '节日礼物',
    description: '为生日、冬日和节庆准备的限量手作。',
  },
]

export const works: Work[] = [
  {
    slug: 'momo-cardigan',
    name: 'Momo 奶油短开衫',
    category: 'knitwear',
    description:
      '奶油白与蜜桃粉交织的短款开衫，适合春秋叠穿，也适合作为 Meowknit 的品牌代表款。',
    images: [
      {
        alt: '奶油白和蜜桃粉短款针织开衫',
        gradient: 'linear-gradient(135deg, #f8decf 0%, #fff6e9 48%, #d68e7a 100%)',
      },
    ],
    featured: true,
    etsyUrl: 'https://www.etsy.com/shop/meowknit',
  },
  {
    slug: 'ginger-market-bag',
    name: '姜糖 Market Bag',
    category: 'crochet-bag',
    description:
      '轻盈的钩针网袋，带有姜糖色肩带和小猫吊牌，适合放书、花束或周末小物。',
    images: [
      {
        alt: '姜糖色钩针网袋',
        gradient: 'linear-gradient(135deg, #c77a47 0%, #f4c08f 52%, #fff2dc 100%)',
      },
    ],
    featured: true,
    etsyUrl: 'https://www.etsy.com/shop/meowknit',
  },
  {
    slug: 'window-sun-coaster-set',
    name: '窗边阳光杯垫组',
    category: 'home-decor',
    description:
      '一组六枚暖色杯垫，灵感来自午后窗边的阳光斑点，可用于餐桌、书桌或礼盒搭配。',
    images: [
      {
        alt: '暖色手工杯垫组',
        gradient: 'linear-gradient(135deg, #f7d27e 0%, #fff0be 48%, #b77853 100%)',
      },
    ],
    featured: true,
    inquiryUrl: 'https://www.instagram.com/meowknit',
  },
  {
    slug: 'cat-cloud-bandana',
    name: '猫云朵小领巾',
    category: 'pet-accessory',
    description:
      '轻薄柔软的宠物小领巾，使用云朵边钩法，适合日常拍照和节日造型。',
    images: [
      {
        alt: '云朵边宠物小领巾',
        gradient: 'linear-gradient(135deg, #a7c6d9 0%, #f7fbff 50%, #dfb1a6 100%)',
      },
    ],
    featured: false,
    socialUrl: instagramUrl,
  },
  {
    slug: 'tiny-latte-bunny',
    name: '拿铁色迷你兔',
    category: 'miniature',
    description:
      '掌心大小的迷你兔玩偶，配有可拆卸小围巾，是 Meowknit 礼物系列的温柔角色。',
    images: [
      {
        alt: '拿铁色迷你兔毛线玩偶',
        gradient: 'linear-gradient(135deg, #8d664f 0%, #c9a07e 48%, #f8e5cf 100%)',
      },
    ],
    featured: true,
    etsyUrl: 'https://www.etsy.com/shop/meowknit',
  },
  {
    slug: 'winter-starlight-ornament',
    name: '冬日星光挂饰',
    category: 'seasonal-gift',
    description:
      '带金线细节的星星挂饰，可挂在包上、门把手或节日树枝上，接受颜色定制咨询。',
    images: [
      {
        alt: '金线星星手工挂饰',
        gradient: 'linear-gradient(135deg, #6f8792 0%, #f5d58a 48%, #fffaf0 100%)',
      },
    ],
    featured: false,
    inquiryUrl: instagramUrl,
  },
]

export function getWorkCta(work: Work): WorkCta {
  if (work.etsyUrl) {
    return {
      label: '在 Etsy 查看',
      href: work.etsyUrl,
      type: 'etsy',
    }
  }

  if (work.inquiryUrl) {
    return {
      label: '咨询定制',
      href: work.inquiryUrl,
      type: 'inquiry',
    }
  }

  return {
    label: '关注 Instagram',
    href: work.socialUrl ?? instagramUrl,
    type: 'social',
  }
}
