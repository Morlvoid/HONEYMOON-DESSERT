import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Checkout() {
  const [countdown, setCountdown] = useState(9);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <PageBanner
        title=""
        titleEn=""
        image="/images/product-3.jpg"
      />

      <Header />

      <main className="flex-1">
        <section className="section-padding bg-white min-h-[400px]">
          <div className="page-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-lg mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>

              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                感谢您的购买！
              </h1>
              <p className="text-gray-600 mb-6">
                满记甜品祝您每天开心！
              </p>

              <div className="flex items-center justify-center gap-2 text-gray-500 mb-8">
                <span className="text-2xl font-bold text-[#F5B800]">{countdown}</span>
                <span>秒后跳转回首页</span>
              </div>

              <Link
                to="/"
                className="inline-block px-8 py-3 bg-[#F5B800] text-white rounded-full font-medium hover:bg-[#E5A800] transition-colors"
              >
                返回首页
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
