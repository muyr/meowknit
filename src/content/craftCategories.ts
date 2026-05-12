import type { RawCraftCategory } from '../types/work'

export const craftCategories: RawCraftCategory[] = [
  {
    id: 'tatting',
    label: {
      'zh-CN': '梭编',
      en: 'Tatting',
    },
    description: {
      'zh-CN': '用梭子和细线做出的轻盈蕾丝结构。',
      en: 'Light lace structures made with a shuttle and fine thread.',
    },
  },
  {
    id: 'crochet',
    label: {
      'zh-CN': '钩针',
      en: 'Crochet',
    },
    description: {
      'zh-CN': '用钩针塑造纹理、边缘和柔软造型。',
      en: 'Hook-shaped textures, edges, and soft forms.',
    },
  },
  {
    id: 'macrame',
    label: {
      'zh-CN': '绳编',
      en: 'Macrame',
    },
    description: {
      'zh-CN': '以打结和绳线结构完成的装饰与配件。',
      en: 'Decor and accessories built from knots and cord structures.',
    },
  },
  {
    id: 'knitting',
    label: {
      'zh-CN': '针织',
      en: 'Knitting',
    },
    description: {
      'zh-CN': '柔软、贴身、适合日常层搭的棒针织物。',
      en: 'Soft knitted pieces for everyday layering.',
    },
  },
]
