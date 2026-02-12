import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageBanner from '../components/PageBanner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getNewsById } from '../data/news';
import { ChevronLeft } from 'lucide-react';

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const news = getNewsById(id || '1');

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="page-container py-16 text-center">
            <p className="text-gray-500">新闻不存在</p>
            <Link to="/news" className="text-[#F5B800] hover:underline mt-4 inline-block">
              返回新闻列表
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PageBanner
        title="最新消息"
        titleEn="what's new"
        image="/images/hero-2.jpg"
      />

      <Header />

      <main className="flex-1">
        <section className="section-padding bg-white">
          <div className="page-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <Link
                to="/news"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-[#F5B800] mb-6"
              >
                <ChevronLeft size={18} />
                返回列表
              </Link>

              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-[#F5B800] text-white text-sm rounded-full mb-4">
                  {news.date} {news.year}
                </span>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                  {news.title}
                </h1>
              </div>

              <img
                src={news.image}
                alt={news.title}
                className="w-full aspect-video object-cover rounded-2xl mb-8"
              />

              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                <p>{news.excerpt}</p>
                <p>
                  满记甜品一直致力于为顾客提供最优质的甜品体验。我们严选每一份食材，
                  坚持传统手工制作工艺，确保每一口甜品都能带给您满满的幸福感。
                </p>
                <p>
                  此次推出的新品，是我们团队经过反复研发和测试的成果。我们希望通过不断创新，
                  为大家带来更多美味的选择，让甜品成为生活中不可或缺的美好时刻。
                </p>
                <p>
                  欢迎大家前往附近的满记甜品门店品尝，或者通过我们的线上商城下单，
                  享受便捷的配送服务。
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
