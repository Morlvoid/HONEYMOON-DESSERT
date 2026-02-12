import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type Language = 'en' | 'zh-TW' | 'zh-CN';

interface Translations {
  [key: string]: string;
}

const translations: Record<Language, Translations> = {
  'en': {
    '最新消息': 'News',
    '产品推介': 'Products',
    '寻找分店': 'Stores',
    '关于满记': 'About Us',
    '会员中心': 'VIP Center',
    '购物车': 'Cart',
    '首页': 'Home',
    '满记甜品': 'Honeymoon Dessert',
    '手造圆满幸福感': 'Handcrafted Happiness',
    '了解更多': 'Learn More',
    '查看更多': 'View More',
    '精选推荐': 'Featured',
    'new products': 'new products',
    "what's new": "what's new",
    '结算': 'Checkout',
    '加入购物车': 'Add to Cart',
    '领券购买': 'Buy with Coupon',
    '数量': 'Quantity',
    '地址': 'Address',
    '修改地址': 'Change Address',
    '合计': 'Total',
    '用户评价': 'Reviews',
    '产品详情': 'Product Details',
    '经典推荐': 'Recommended',
    '全部': 'All',
    '搜索产品': 'Search products...',
    '编辑资料': 'Edit Profile',
    '保存': 'Save',
    '取消': 'Cancel',
    '昵称': 'Nickname',
    '性别': 'Gender',
    '手机号': 'Phone',
    '密码': 'Password',
    '编辑地址': 'Edit Address',
    '男': 'Male',
    '女': 'Female',
    '常温': 'Room Temp',
    '冷藏': 'Chilled',
    '优惠券': 'Coupon',
    '券后': 'After Coupon',
    '快速链接': 'Quick Links',
    '联系我们': 'Contact Us',
    '关注我们': 'Follow Us',
    '隐私政策': 'Privacy Policy',
    '使用条款': 'Terms of Use',
  },
  'zh-TW': {
    '最新消息': '最新消息',
    '产品推介': '產品推介',
    '寻找分店': '尋找分店',
    '关于满记': '關於滿記',
    '会员中心': '會員中心',
    '购物车': '購物車',
    '首页': '首頁',
    '满记甜品': '滿記甜品',
    '手造圆满幸福感': '手造圓滿幸福感',
    '了解更多': '了解更多',
    '查看更多': '查看更多',
    '精选推荐': '精選推薦',
    'new products': '新品推薦',
    "what's new": '最新動態',
    '结算': '結算',
    '加入购物车': '加入購物車',
    '领券购买': '領券購買',
    '数量': '數量',
    '地址': '地址',
    '修改地址': '修改地址',
    '合计': '合計',
    '用户评价': '用戶評價',
    '产品详情': '產品詳情',
    '经典推荐': '經典推薦',
    '全部': '全部',
    '搜索产品': '搜尋產品...',
    '编辑资料': '編輯資料',
    '保存': '保存',
    '取消': '取消',
    '昵称': '暱稱',
    '性别': '性別',
    '手机号': '手機號',
    '密码': '密碼',
    '编辑地址': '編輯地址',
    '男': '男',
    '女': '女',
    '常温': '常溫',
    '冷藏': '冷藏',
    '优惠券': '優惠券',
    '券后': '券後',
    '快速链接': '快速連結',
    '联系我们': '聯繫我們',
    '关注我们': '關注我們',
    '隐私政策': '隱私政策',
    '使用条款': '使用條款',
  },
  'zh-CN': {
    '最新消息': '最新消息',
    '产品推介': '产品推介',
    '寻找分店': '寻找分店',
    '关于满记': '关于满记',
    '会员中心': '会员中心',
    '购物车': '购物车',
    '首页': '首页',
    '满记甜品': '满记甜品',
    '手造圆满幸福感': '手造圆满幸福感',
    '了解更多': '了解更多',
    '查看更多': '查看更多',
    '精选推荐': '精选推荐',
    'new products': 'new products',
    "what's new": "what's new",
    '结算': '结算',
    '加入购物车': '加入购物车',
    '领券购买': '领券购买',
    '数量': '数量',
    '地址': '地址',
    '修改地址': '修改地址',
    '合计': '合计',
    '用户评价': '用户评价',
    '产品详情': '产品详情',
    '经典推荐': '经典推荐',
    '全部': '全部',
    '搜索产品': '搜索产品...',
    '编辑资料': '编辑资料',
    '保存': '保存',
    '取消': '取消',
    '昵称': '昵称',
    '性别': '性别',
    '手机号': '手机号',
    '密码': '密码',
    '编辑地址': '编辑地址',
    '男': '男',
    '女': '女',
    '常温': '常温',
    '冷藏': '冷藏',
    '优惠券': '优惠券',
    '券后': '券后',
    '快速链接': '快速链接',
    '联系我们': '联系我们',
    '关注我们': '关注我们',
    '隐私政策': '隐私政策',
    '使用条款': '使用条款',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh-CN');

  const t = useCallback((key: string): string => {
    return translations[language][key] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
