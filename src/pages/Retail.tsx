import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Minus, Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const thumbnails = [
  '/images/product-5.jpg',
  '/images/product-3.jpg',
  '/images/product-1.jpg',
];

const reviews = [
  {
    id: '1',
    name: '芒果脑袋',
    date: '2022-8-21',
    content: '颜值与美味并存~安利~',
    avatar: '/images/product-1.jpg',
  },
  {
    id: '2',
    name: 'mj-1234567',
    date: '2022-8-27',
    content: '好吃！',
    avatar: '/images/product-2.jpg',
  },
  {
    id: '3',
    name: 'mj-1234567',
    date: '2022-8-27',
    content: '好吃！',
    avatar: '/images/product-3.jpg',
  },
];

const relatedProducts = [
  { id: '1', name: '可以吸的甘露双皮奶', image: '/images/hero-3.jpg' },
  { id: '2', name: '可以吸的芋泥双皮奶', image: '/images/product-4.jpg' },
  { id: '3', name: '可以吸的杨枝甘露', image: '/images/hero-2.jpg' },
];

export default function Retail() {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [temperature, setTemperature] = useState<'常温' | '冷藏'>('常温');
  const [showSuccess, setShowSuccess] = useState(false);
  const { addItem } = useCart();
  const { t } = useLanguage();

  const product = {
    id: id || '1',
    name: '麻薯抹茶奶冻',
    nameEn: 'Matcha Mochi Pudding',
    image: '/images/product-5.jpg',
    price: 25.9,
    description: '层层叠叠的春日温柔，一口就沦陷。',
    detailDescription: `三重口感暴击：顶层是顺滑细腻的抹茶奶冻，带着茶香微苦；中间是绵密的红豆沙，甜而不腻；底层是Q弹软糯的麻薯，糯叽叽星人狂喜。

茶香清新不腻：选用日式抹茶粉，香气浓郁却不苦涩，搭配奶香醇厚的奶冻，每一口都是恰到好处的温柔。

宝藏下午茶选择：冷藏后口感更佳，无论是午后解馋，还是追剧小食，都能给你满满的治愈感。`,
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: quantity,
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageBanner
        title="快递零售"
        titleEn="New Retail"
        image="/images/hero-1.jpg"
      />

      <Header />

      <main className="flex-1">
        <section className="section-padding bg-white">
          <div className="page-container">
            {/* Product Detail */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="aspect-square bg-[#FFF9E6] rounded-2xl overflow-hidden mb-4">
                  <img
                    src={thumbnails[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-3">
                  {thumbnails.map((thumb, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-[#F5B800]' : 'border-transparent'
                      }`}
                    >
                      <img src={thumb} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h1>
                <p className="text-gray-600 mb-6">{product.description}</p>

                <div className="text-sm text-gray-500 mb-6">
                  48小时内发货，预计后天送达快递: 免运费
                </div>

                {/* Temperature Selection */}
                <div className="flex gap-3 mb-6">
                  <button
                    onClick={() => setTemperature('常温')}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      temperature === '常温'
                        ? 'border-[#F5B800] bg-[#FFF9E6] text-[#F5B800]'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    {t('常温')}
                  </button>
                  <button
                    onClick={() => setTemperature('冷藏')}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      temperature === '冷藏'
                        ? 'border-[#F5B800] bg-[#FFF9E6] text-[#F5B800]'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    {t('冷藏')}
                  </button>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-gray-600">{t('数量')}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-sm text-gray-500">{t('券后')}</span>
                    <span className="text-3xl font-bold text-[#F5B800] ml-2">
                      ¥{(product.price * quantity).toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Button 
                      onClick={handleAddToCart}
                      className="w-full bg-[#F5B800] hover:bg-[#E5A800]"
                    >
                      <ShoppingCart size={18} className="mr-2" />
                      {t('加入购物车')}
                    </Button>
                    
                    {/* Success Toast */}
                    <AnimatePresence>
                      {showSuccess && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.9 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap"
                        >
                          <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                            <Check size={16} />
                            <span>已添加到购物车</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <Button variant="outline" className="flex-1 border-[#F5B800] text-[#F5B800]">
                    {t('领券购买')}
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Reviews */}
            <div className="mb-16">
              <h2 className="text-xl font-bold text-gray-800 mb-6">{t('用户评价')}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{review.name}</span>
                        <span className="text-xs text-gray-400">{review.date}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{review.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Product Detail */}
            <div className="mb-16">
              <h2 className="text-xl font-bold text-gray-800 mb-6">{t('产品详情')}</h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#FFF9E6] rounded-2xl p-8"
              >
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">{product.name}</h3>
                    <div className="text-gray-600 whitespace-pre-line leading-relaxed">
                      {product.detailDescription}
                    </div>
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="rounded-xl"
                  />
                </div>
              </motion.div>
            </div>

            {/* Related Products */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-6">{t('经典推荐')}</h2>
              <div className="grid grid-cols-3 gap-4">
                {relatedProducts.map((product) => (
                  <Link key={product.id} to={`/retail/${product.id}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-[#FFF9E6] rounded-xl overflow-hidden"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full aspect-square object-cover"
                      />
                      <div className="p-4 text-center">
                        <p className="font-medium text-sm">{product.name}</p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
