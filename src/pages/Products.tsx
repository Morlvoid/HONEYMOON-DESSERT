import { useState } from 'react';
import { motion } from 'framer-motion';
import PageBanner from '../components/PageBanner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const categories = ['全部', '椰皇系列', '甘露系列', '冰系列', '奶系列', '紫薯系列', '饮品系列'];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLanguage();

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === '全部' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <PageBanner
        title={t('产品推介')}
        titleEn="new product"
        image="/images/product-7.jpg"
      />

      <Header />

      <main className="flex-1">
        {/* Filter Section */}
        <section className="py-8 bg-white border-b">
          <div className="page-container">
            <div className="flex flex-col lg:flex-row items-center gap-4">
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-[#F5B800] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full lg:w-auto lg:ml-auto">
                <input
                  type="text"
                  placeholder={t('搜索产品')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full lg:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-[#F5B800] focus:ring-1 focus:ring-[#F5B800]"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="section-padding bg-white">
          <div className="page-container">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard {...product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500">没有找到符合条件的产品</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
