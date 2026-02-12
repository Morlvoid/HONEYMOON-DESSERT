import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageBanner from '../components/PageBanner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MapPin, Phone, Clock, Search, Navigation } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useLanguage } from '../context/LanguageContext';

const stats = [
  { value: '40+', label: '覆盖城市' },
  { value: '200+', label: '现有门店' },
  { value: '750W+', label: '累计会员' },
  { value: '3000W+', label: '每年门店客流' },
];

interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
}

const storeLocations: StoreLocation[] = [
  { id: '1', name: '满记甜品·西单店', address: '北京市西城区西单北大街110号老佛爷百货B1层', city: '北京', phone: '010-66012345', hours: '10:00-22:00', lat: 39.9042, lng: 116.4074 },
  { id: '2', name: '满记甜品·朝阳大悦城店', address: '北京市朝阳区朝阳北路101号朝阳大悦城B1层', city: '北京', phone: '010-85561234', hours: '10:00-22:00', lat: 39.9289, lng: 116.5180 },
  { id: '3', name: '满记甜品·三里屯店', address: '北京市朝阳区三里屯路19号三里屯太古里南区B1层', city: '北京', phone: '010-64171234', hours: '10:00-22:30', lat: 39.9354, lng: 116.4551 },
  { id: '4', name: '满记甜品·南京路店', address: '上海市黄浦区南京东路299号宏伊国际广场B1层', city: '上海', phone: '021-63281234', hours: '10:00-22:00', lat: 31.2304, lng: 121.4737 },
  { id: '5', name: '满记甜品·天河城店', address: '广州市天河区天河路208号天河城B1层', city: '广州', phone: '020-85591234', hours: '10:00-22:00', lat: 23.1320, lng: 113.2644 },
];

const cityPositions: Record<string, { top: string; left: string }> = {
  '北京': { top: '28%', left: '68%' },
  '上海': { top: '52%', left: '78%' },
  '广州': { top: '72%', left: '62%' },
  '深圳': { top: '76%', left: '64%' },
  '杭州': { top: '56%', left: '74%' },
  '南京': { top: '48%', left: '72%' },
  '成都': { top: '52%', left: '48%' },
  '重庆': { top: '54%', left: '50%' },
  '武汉': { top: '54%', left: '62%' },
  '西安': { top: '42%', left: '54%' },
};

const partners = [
  { name: '喜士多', logo: '/images/partner-cstore.jpg' },
  { name: '罗森', logo: '/images/partner-lawson.jpg' },
  { name: '7-Eleven', logo: '/images/partner-7eleven.jpg' },
  { name: '盒马鲜生', logo: '/images/partner-hema.jpg' },
  { name: 'FamilyMart', logo: '/images/partner-familymart.jpg' },
];

export default function Stores() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const { t } = useLanguage();

  const filteredStores = storeLocations.filter(store => 
    (selectedCity ? store.city === selectedCity : true) &&
    (searchQuery ? store.name.includes(searchQuery) || store.address.includes(searchQuery) : true)
  );

  const cities = ['全部', ...Array.from(new Set(storeLocations.map(s => s.city)))];

  return (
    <div className="min-h-screen flex flex-col">
      <PageBanner
        title={t('寻找分店')}
        titleEn="Stores"
        image="/images/store-interior.jpg"
      />

      <Header />

      <main className="flex-1">
        {/* Quote Section */}
        <section className="py-12 bg-white">
          <div className="page-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="text-4xl text-[#F5B800] mb-4">"</div>
              <p className="text-lg text-gray-600 italic leading-relaxed">
                我认为入局满记甜品是一个很好的契机，让更多的家乡人能吃到满记，
                体验这份甜蜜。希望满记甜品生意红红火火，一直走下去！
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section-padding bg-[#FFF9E6]">
          <div className="page-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-3 h-3 bg-[#F5B800] rounded-full" />
              <h2 className="text-xl font-bold text-gray-800">全国分店</h2>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl lg:text-4xl font-bold text-[#F5B800] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Interactive Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              {/* Search Bar */}
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="搜索门店..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F5B800] focus:ring-2 focus:ring-[#F5B800]/20"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city === '全部' ? null : city)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        (city === '全部' && !selectedCity) || selectedCity === city
                          ? 'bg-[#F5B800] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Map Visualization */}
              <div className="aspect-[16/9] bg-gradient-to-b from-blue-50 to-green-50 rounded-xl relative overflow-hidden border border-gray-100">
                {/* China Map Outline (Simplified) */}
                <svg
                  viewBox="0 0 100 80"
                  className="absolute inset-0 w-full h-full opacity-30"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="0.3"
                >
                  <path d="M20,25 Q25,20 35,22 Q45,18 55,20 Q65,15 75,18 Q85,20 88,28 Q90,35 85,42 Q88,50 82,58 Q75,65 65,68 Q55,72 45,70 Q35,68 28,62 Q22,55 20,45 Q18,35 20,25 Z" />
                </svg>

                {/* City Markers */}
                {Object.entries(cityPositions).map(([city, pos]) => {
                  const storeCount = storeLocations.filter(s => s.city === city).length;
                  const isActive = selectedCity === city || hoveredCity === city;
                  const hasStores = storeCount > 0;

                  return (
                    <motion.button
                      key={city}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.2 }}
                      onClick={() => setSelectedCity(city === selectedCity ? null : city)}
                      onMouseEnter={() => setHoveredCity(city)}
                      onMouseLeave={() => setHoveredCity(null)}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{ top: pos.top, left: pos.left }}
                    >
                      <div className={`relative ${isActive ? 'z-10' : ''}`}>
                        <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all ${
                          isActive ? 'bg-[#F5B800] w-6 h-6' : hasStores ? 'bg-[#F5B800]' : 'bg-gray-300'
                        }`}>
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-[8px] text-white flex items-center justify-center"
                            >
                              {storeCount}
                            </motion.div>
                          )}
                        </div>
                        {/* Tooltip */}
                        <AnimatePresence>
                          {(hoveredCity === city || selectedCity === city) && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap"
                            >
                              <div className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg">
                                {city} ({storeCount}家门店)
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.button>
                  );
                })}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="w-3 h-3 bg-[#F5B800] rounded-full" />
                    <span>有门店</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                    <div className="w-3 h-3 bg-gray-300 rounded-full" />
                    <span>即将开业</span>
                  </div>
                </div>
              </div>

              {/* Store List */}
              <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                  {filteredStores.map((store, index) => (
                    <motion.div
                      key={store.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-gray-50 rounded-xl p-4 hover:bg-[#FFF9E6] transition-colors cursor-pointer group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-[#F5B800] rounded-lg flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                          <MapPin size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 truncate">{store.name}</h4>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{store.address}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <Phone size={12} />
                              {store.phone}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {store.hours}
                            </span>
                          </div>
                        </div>
                        <button className="shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#F5B800] shadow-sm hover:shadow-md transition-shadow">
                          <Navigation size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Store Environment */}
        <section className="section-padding bg-white">
          <div className="page-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-3 h-3 bg-[#F5B800] rounded-full" />
              <h2 className="text-xl font-bold text-gray-800">门店环境</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <img
                  src="/images/store-interior.jpg"
                  alt="门店环境"
                  className="rounded-2xl shadow-lg w-full"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col justify-center"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  温馨舒适的用餐环境
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  满记甜品门店采用现代简约的设计风格，以品牌标志性的黄色为主色调，
                  营造出温馨、舒适的用餐氛围。无论是与朋友小聚，还是独自享受甜品时光，
                  这里都是您的理想选择。
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock size={20} className="text-[#F5B800]" />
                    <span>营业时间：10:00 - 22:00</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone size={20} className="text-[#F5B800]" />
                    <span>客服热线：400 9090 980</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="section-padding bg-[#FFF9E6]">
          <div className="page-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">合作伙伴</h2>
              <p className="text-gray-500">携手共创甜蜜事业</p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-6">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <div className="w-24 h-24 bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-2">{partner.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Franchise Info */}
        <section className="section-padding bg-white">
          <div className="page-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#F5B800] rounded-2xl p-8 lg:p-12 text-center text-white"
            >
              <h2 className="text-2xl lg:text-3xl font-bold mb-8">加盟信息</h2>
              <div className="grid grid-cols-3 gap-8 mb-8">
                <div>
                  <div className="text-3xl lg:text-4xl font-bold mb-2">18000m²</div>
                  <div className="text-white/80 text-sm">研发工厂总面积</div>
                </div>
                <div>
                  <div className="text-3xl lg:text-4xl font-bold mb-2">10+</div>
                  <div className="text-white/80 text-sm">独家产品秘方</div>
                </div>
                <div>
                  <div className="text-3xl lg:text-4xl font-bold mb-2">30年</div>
                  <div className="text-white/80 text-sm">国民甜品工艺传承</div>
                </div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="px-8 py-3 bg-white text-[#F5B800] rounded-full font-bold hover:bg-gray-100 transition-colors">
                    申请加盟 →
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="sm:max-w-md">
                  <AlertDialogHeader>
                    <AlertDialogTitle>申请加盟</AlertDialogTitle>
                    <AlertDialogDescription>
                      申请加盟邮箱地址：franchise@manjiskin.com。是否跳转到邮箱？
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <AlertDialogAction onClick={() => window.location.href = 'mailto:franchise@manjiskin.com'}>
                      确认
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <p className="mt-4 text-white/80 text-sm">加盟热线：400 9090 980</p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
