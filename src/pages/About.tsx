import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import PageBanner from '../components/PageBanner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ value, suffix = '', duration = 2 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const features = [
  {
    title: '新鲜',
    subtitle: '源头食材',
    description: '严选优质，时令的食材',
    icon: '🥭',
  },
  {
    title: '轻甜',
    subtitle: '天然果糖',
    description: '不额外添加糖分',
    icon: '🍯',
  },
  {
    title: '时令',
    subtitle: '不时不食',
    description: '四季轮换，应季而食',
    icon: '🌸',
  },
  {
    title: '养生',
    subtitle: '匠心手作',
    description: '传统配方，健康美味',
    icon: '🫘',
  },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <PageBanner
        title={t('关于满记')}
        titleEn="About"
        image="/images/hero-1.jpg"
      />

      <Header />

      <main className="flex-1">
        {/* Brand Concept */}
        <section className="section-padding bg-white">
          <div className="page-container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block px-4 py-2 bg-[#F5B800] text-white text-sm font-medium rounded-full mb-4">
                  国民甜品开创者
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                  三分技巧七分心<br />
                  清水岂能成甘露<br />
                  壹粒壹豆非等闲<br />
                  芝麻绿豆本平凡
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  满记甜品自1995年创立以来，一直坚持"手造圆满幸福感"的品牌理念。
                  我们相信，每一份甜品都承载着对美好生活的向往，每一口甜蜜都是对幸福的诠释。
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 gap-4"
              >
                <img
                  src="/images/product-1.jpg"
                  alt="满记甜品"
                  className="rounded-2xl shadow-lg"
                />
                <img
                  src="/images/product-2.jpg"
                  alt="满记甜品"
                  className="rounded-2xl shadow-lg mt-8"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="section-padding bg-[#FFF9E6]">
          <div className="page-container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: 7000000, suffix: '个', label: '全年销量', sublabel: '精选优秀' },
                { value: 14000, suffix: '片', label: '每日制作', sublabel: '调制欢欣' },
                { value: 40, suffix: '+', label: '覆盖城市', sublabel: '全国分店' },
                { value: 200, suffix: '+', label: '门店数量', sublabel: '遍布全国' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-sm text-gray-500 mb-1">{stat.sublabel}</div>
                  <div className="text-3xl lg:text-4xl font-bold text-[#F5B800] mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding bg-white">
          <div className="page-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                四大特色
              </h2>
              <p className="text-gray-500">Fresh · Light · Seasonal · Healthy</p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-[#FFF9E6] rounded-2xl p-6 text-center"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{feature.title}</h3>
                  <p className="text-sm text-[#F5B800] mb-2">{feature.subtitle}</p>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Story */}
        <section className="section-padding bg-[#FFF9E6]">
          <div className="page-container">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
                  满记甜品发展历程
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  1995是一个经典丛生的时代，一个新的世纪从那里开始。2023是我们曾经期待的未来。
                  许多人，在1995开启未来。许多故事，都从1995年开始。满记甜品的故事，也是从那时候开始的。
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  满记的"满"，来自"moon"的粤语发音。月亮，在中国传统文化中有独特的地位，
                  寄托着中国人永恒甜蜜、幸福圆满的美好情感。这是属于中国人的浪漫。
                </p>
                <p className="text-gray-600 leading-relaxed">
                  1995年香港西贡，满记从一家小小的糖水铺开始，将独特的传统甜品秘方发扬光大。
                  取"新鲜时令，养生轻甜"的理念，把这一口满足与幸福传递给全球的每个中国人。
                </p>
                <div className="mt-8 text-2xl font-bold text-[#F5B800]">
                  代表月亮甜宠你
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
