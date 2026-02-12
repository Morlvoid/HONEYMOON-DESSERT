import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../context/LanguageContext';

export default function VIPCenter() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nickname: '李女士',
    gender: '女',
    phone: '138****8888',
    password: '********',
  });
  const { t } = useLanguage();

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageBanner
        title={t('会员中心')}
        titleEn="VIP Center"
        image="/images/product-1.jpg"
      />

      <Header />

      <main className="flex-1">
        <section className="section-padding bg-white">
          <div className="page-container">
            <div className="max-w-lg mx-auto">
              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex justify-center gap-4 mb-8"
              >
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-8 ${isEditing ? 'bg-gray-500' : 'bg-[#F5B800]'}`}
                >
                  {isEditing ? t('取消') : t('编辑资料')}
                </Button>
                {isEditing && (
                  <Button onClick={handleSave} className="px-8 bg-[#F5B800]">
                    {t('保存')}
                  </Button>
                )}
              </motion.div>

              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex justify-center mb-8"
              >
                <div className="w-24 h-24 bg-[#F5B800] rounded-full flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-lg font-bold">满记</div>
                    <div className="text-xs">甜品</div>
                  </div>
                </div>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm text-gray-600 mb-1">{t('昵称')}</label>
                  <Input
                    value={formData.nickname}
                    onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                    disabled={!isEditing}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">{t('性别')}</label>
                  <Input
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    disabled={!isEditing}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">{t('手机号')}</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">{t('密码')}</label>
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    disabled={!isEditing}
                    className="w-full"
                  />
                </div>

                <div className="pt-4">
                  <Link to="/member-addresses">
                    <Button variant="outline" className="w-full border-[#F5B800] text-[#F5B800]">
                      {t('编辑地址')}
                    </Button>
                  </Link>
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
