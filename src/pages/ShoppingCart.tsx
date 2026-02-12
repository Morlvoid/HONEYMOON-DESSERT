import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { MapPin, Minus, Plus, Trash2, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function ShoppingCart() {
  const { 
    items, 
    selectedCount, 
    totalCount,
    updateQuantity, 
    toggleSelected, 
    toggleAll, 
    removeItem 
  } = useCart();
  const { t } = useLanguage();
  const [showSuccess] = useState(false);
  const navigate = useNavigate();

  const selectedItems = items.filter(item => item.selected);
  const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const allSelected = items.length > 0 && items.every(item => item.selected);

  const handleCheckout = () => {
    if (selectedItems.length > 0) {
      const orderId = `ORDER${Date.now()}`;
      navigate(`/payment?orderId=${orderId}&amount=${total}&items=${selectedCount}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageBanner
        title={t('购物车')}
        titleEn="Shopping Cart"
        image="/images/product-3.jpg"
      />

      <Header />

      <main className="flex-1">
        <section className="section-padding bg-white">
          <div className="page-container">
            {/* Address Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-6"
            >
              <div className="flex items-center gap-3">
                <MapPin className="text-[#F5B800]" size={20} />
                <span className="text-gray-600 text-sm">
                  {t('地址')}：北京市朝阳区XXXX路XXXX街道XXXX小区XX栋XX单元XXXXX
                </span>
              </div>
              <Button variant="outline" className="border-[#F5B800] text-[#F5B800]">
                {t('修改地址')}
              </Button>
            </motion.div>

            {/* Select All */}
            {items.length > 0 && (
              <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={(checked) => toggleAll(!!checked)}
                  className="data-[state=checked]:bg-[#F5B800] data-[state=checked]:border-[#F5B800]"
                />
                <span className="text-sm text-gray-600">
                  全选 ({selectedCount}/{totalCount})
                </span>
              </div>
            )}

            {/* Cart Items */}
            <div className="space-y-4 mb-8">
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4 p-4 border rounded-xl hover:shadow-md transition-shadow"
                  >
                    <Checkbox
                      checked={item.selected}
                      onCheckedChange={() => toggleSelected(item.id)}
                      className="data-[state=checked]:bg-[#F5B800] data-[state=checked]:border-[#F5B800]"
                    />

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        2小时内发货，预计2小时送达 快递: 2包装费，5运费
                      </p>
                      <span className="inline-block mt-2 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        冷藏
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-bold text-[#F5B800]">
                        ¥{item.price.toFixed(1)}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 border rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 border rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {items.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">购物车是空的</p>
                  <Link
                    to="/products"
                    className="inline-block mt-4 px-6 py-2 bg-[#F5B800] text-white rounded-full hover:bg-[#E5A800] transition-colors"
                  >
                    去购物
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Summary */}
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-between p-6 bg-gray-50 rounded-xl"
              >
                <div>
                  <span className="text-gray-600">{t('合计')}：</span>
                  <span className="text-2xl font-bold text-[#F5B800]">
                    ¥{total.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-400 ml-2">
                    (已选{selectedCount}件)
                  </span>
                </div>
                <div className="relative">
                  <Button 
                    onClick={handleCheckout}
                    disabled={selectedItems.length === 0}
                    className={`px-8 py-3 text-lg transition-all ${
                      selectedItems.length > 0
                        ? 'bg-[#F5B800] hover:bg-[#E5A800]'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    {t('结算')}
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
                          <span>已添加到订单</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
