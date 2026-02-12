export interface Product {
  id: string;
  name: string;
  nameEn: string;
  image: string;
  price: number;
  category: string;
  description?: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: '满记椰皇',
    nameEn: 'Coconut',
    image: '/images/product-2.jpg',
    price: 35.9,
    category: '椰皇系列',
    description: '精选泰国大颗椰皇，拥有幼嫩口感和丰富汁水，堪称"椰中小鲜肉"',
  },
  {
    id: '2',
    name: '杨枝甘露',
    nameEn: 'Mango Pomelo',
    image: '/images/hero-2.jpg',
    price: 28.0,
    category: '甘露系列',
    description: '经典港式甜品，芒果与柚子的完美搭配',
  },
  {
    id: '3',
    name: '白雪冰',
    nameEn: 'Creamy Ice',
    image: '/images/product-1.jpg',
    price: 25.9,
    category: '冰系列',
    description: '清爽白雪冰，夏日解暑首选',
  },
  {
    id: '4',
    name: '双皮奶',
    nameEn: 'Milk Custard',
    image: '/images/hero-3.jpg',
    price: 18.0,
    category: '奶系列',
    description: '传统港式双皮奶，香滑细腻',
  },
  {
    id: '5',
    name: '紫薯芋泥荷花挞',
    nameEn: 'Taro Tart',
    image: '/images/product-4.jpg',
    price: 28.0,
    category: '紫薯系列',
    description: '紫薯与芋泥的完美结合',
  },
  {
    id: '6',
    name: '紫薯班戟',
    nameEn: 'Purple Pancake',
    image: '/images/product-4.jpg',
    price: 22.0,
    category: '紫薯系列',
    description: '紫薯班戟，软糯香甜',
  },
  {
    id: '7',
    name: '焗紫薯西米布丁',
    nameEn: 'Purple Pudding',
    image: '/images/product-4.jpg',
    price: 24.0,
    category: '紫薯系列',
    description: '焗烤紫薯西米布丁',
  },
  {
    id: '8',
    name: '椰皇紫薯汤圆',
    nameEn: 'Coconut Tangyuan',
    image: '/images/product-2.jpg',
    price: 32.0,
    category: '椰皇系列',
    description: '椰皇紫薯汤圆，温暖甜蜜',
  },
  {
    id: '9',
    name: '西瓜冰杯',
    nameEn: 'Watermelon Ice',
    image: '/images/product-7.jpg',
    price: 18.0,
    category: '饮品系列',
    description: '清爽西瓜冰杯',
  },
  {
    id: '10',
    name: '香芒冰杯',
    nameEn: 'Mango Ice',
    image: '/images/product-7.jpg',
    price: 20.0,
    category: '饮品系列',
    description: '香芒冰杯，芒果控最爱',
  },
  {
    id: '11',
    name: '清爽柠檬水',
    nameEn: 'Lemonade',
    image: '/images/product-7.jpg',
    price: 15.0,
    category: '饮品系列',
    description: '清爽柠檬水，解腻神器',
  },
  {
    id: '12',
    name: '草莓冰杯',
    nameEn: 'Strawberry Ice',
    image: '/images/product-7.jpg',
    price: 22.0,
    category: '饮品系列',
    description: '草莓冰杯，酸甜可口',
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category === category);
};
