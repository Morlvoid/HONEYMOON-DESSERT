import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LazyImage from '../components/LazyImage';
import ProductCard from '../components/ProductCard';
import NewsCard from '../components/NewsCard';
import { products } from '../data/products';
import { newsItems } from '../data/news';
import { useLanguage } from '../context/LanguageContext';

const heroImages = [
  { src: '/images/hero-1.jpg', title: '白雪黑珍珠', subtitle: '经典港式甜品' },
  { src: '/images/hero-2.jpg', title: '杨枝甘露', subtitle: '芒果与柚子的完美邂逅' },
  { src: '/images/hero-3.jpg', title: '双皮奶', subtitle: '传统港式经典' },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section - 导航栏下方 */}
      <section className="relative h-[400px] lg:h-[500px] overflow-hidden">
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <LazyImage
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            <div className="absolute bottom-20 left-8 lg:left-16 text-white">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: index === currentSlide ? 0 : 20, opacity: index === currentSlide ? 1 : 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl lg:text-5xl font-bold mb-2"
              >
                {image.title}
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: index === currentSlide ? 0 : 20, opacity: index === currentSlide ? 1 : 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg lg:text-xl"
              >
                {image.subtitle}
              </motion.p>
            </div>
          </motion.div>
        ))}

        {/* Slide Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-[#F5B800]' : 'bg-white/60'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Header - 导航栏在Hero下方 */}
      <Header />

      <main className="flex-1">
        {/* Brand Story Section */}
        <section className="section-padding bg-white">
          <div className="page-container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-[#F5B800] text-white text-sm rounded">手</span>
                  <span className="px-3 py-1 bg-[#F5B800] text-white text-sm rounded">造</span>
                  <span className="px-3 py-1 bg-[#F5B800] text-white text-sm rounded">圆</span>
                  <span className="px-3 py-1 bg-[#F5B800] text-white text-sm rounded">满</span>
                  <span className="px-3 py-1 bg-[#F5B800] text-white text-sm rounded">幸</span>
                  <span className="px-3 py-1 bg-[#F5B800] text-white text-sm rounded">福</span>
                  <span className="px-3 py-1 bg-[#F5B800] text-white text-sm rounded">感</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                  由1995年，满记甜品<br />
                  从平凡的芝麻绿豆做起
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  我们一直谨从以心调配，坚持手造甜品的理念。<br />
                  严选优质，时令的食材，结合新颖，巧妙的意念，<br />
                  透过认真，细致的烹饪煮，奉上滋味，窝心的甜品。
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-[#F5B800] font-medium hover:underline"
                >
                  {t('了解更多')}
                  <ChevronRight size={18} />
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <LazyImage
                  src="/images/store-interior.jpg"
                  alt="满记甜品门店"
                  className="rounded-2xl shadow-xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Latest News Section */}
        <section className="section-padding bg-[#FFF9E6]">
          <div className="page-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                {t('最新消息')}
              </h2>
              <p className="text-xl text-[#F5B800]">{t("what's new")}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsItems.slice(0, 3).map((news) => (
                <NewsCard key={news.id} {...news} />
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                to="/news"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#F5B800] text-white rounded-full font-medium hover:bg-[#E5A800] transition-colors"
              >
                {t('查看更多')}
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="section-padding bg-white">
          <div className="page-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                {t('精选推荐')}
              </h2>
              <p className="text-xl text-[#F5B800]">{t('new products')}</p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#F5B800] text-[#F5B800] rounded-full font-medium hover:bg-[#F5B800] hover:text-white transition-colors"
              >
                {t('查看全部产品')}
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#F5B800]">
          <div className="page-container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4">
                {t('手造圆满幸福感')}
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                满记甜品，用心制作每一份甜品，让您品尝到最纯正的港式风味
              </p>
              <Link
                to="/stores"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#F5B800] rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                <ShoppingCart size={20} />
                {t('寻找附近门店')}
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
