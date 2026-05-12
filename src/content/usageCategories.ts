import type { RawUsageCategory } from '../types/work'

export const usageCategories: RawUsageCategory[] = [
  {
    id: 'home',
    label: {
      'zh-CN': '家居',
      en: 'Home',
    },
    description: {
      'zh-CN': '杯垫、挂饰、收纳和让角落变温暖的手作。',
      en: 'Coasters, ornaments, storage, and warm handmade touches for the home.',
    },
  },
  {
    id: 'jewelry',
    label: {
      'zh-CN': '首饰',
      en: 'Jewelry',
    },
    description: {
      'zh-CN': '耳饰、项链和适合日常点缀的小件。',
      en: 'Earrings, necklaces, and small pieces for everyday styling.',
    },
  },
  {
    id: 'pet-goods',
    label: {
      'zh-CN': '宠物用品',
      en: 'Pet Goods',
    },
    description: {
      'zh-CN': '给猫猫狗狗的小围巾、拍照小物和轻量配饰。',
      en: 'Tiny scarves, photo props, and light accessories for cats and dogs.',
    },
  },
  {
    id: 'bags',
    label: {
      'zh-CN': '包袋',
      en: 'Bags',
    },
    description: {
      'zh-CN': '小容量但很有存在感的出门配饰。',
      en: 'Small carry pieces with a strong handmade presence.',
    },
  },
  {
    id: 'gifts',
    label: {
      'zh-CN': '礼物',
      en: 'Gifts',
    },
    description: {
      'zh-CN': '适合收藏、生日和节日赠礼的限量手作。',
      en: 'Limited handmade pieces for collecting, birthdays, and celebrations.',
    },
  },
]
