import { useState } from 'react';
import { motion } from 'framer-motion';
import PageBanner from '../components/PageBanner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsCard from '../components/NewsCard';
import { newsItems } from '../data/news';
import { Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const years = ['全部年份', '2021', '2020', '2019'];
const categories = ['全部种类', '新品', '活动', '节日', '养生'];

export default function News() {
  const [selectedYear, setSelectedYear] = useState('全部年份');
  const [selectedCategory, setSelectedCategory] = useState('全部种类');
  const { t } = useLanguage();

  const filteredNews = newsItems.filter((news) => {
    const matchesYear = selectedYear === '全部年份' || news.year === selectedYear;
    const matchesCategory = selectedCategory === '全部种类' || news.category === selectedCategory;
    return matchesYear && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <PageBanner
        title={t('最新消息')}
        titleEn="what's new"
        image="/images/hero-2.jpg"
      />

      <Header />

      <main className="flex-1">
        {/* Filter Section */}
        <section className="py-8 bg-white border-b">
          <div className="page-container">
            <div className="flex flex-col lg:flex-row items-center gap-4">
              {/* Year Filter */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full lg:w-auto px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#F5B800]"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full lg:w-auto px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#F5B800]"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Search Button */}
              <button className="w-full lg:w-auto px-6 py-2 bg-[#F5B800] text-white rounded-lg font-medium hover:bg-[#E5A800] transition-colors lg:ml-auto">
                <Search size={18} className="inline mr-2" />
                搜索
              </button>
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="section-padding bg-white">
          <div className="page-container">
            {filteredNews.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map((news, index) => (
                  <motion.div
                    key={news.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <NewsCard {...news} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500">没有找到符合条件的新闻</p>
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-12">
              <button className="w-10 h-10 rounded-full bg-[#F5B800] text-white flex items-center justify-center">
                1
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200">
                2
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200">
                3
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
