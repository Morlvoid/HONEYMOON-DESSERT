import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageBanner from '../components/PageBanner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Plus, Edit2, Trash2, Save, Check } from 'lucide-react';

interface Address {
  id: string;
  name: string;
  address: string;
}

export default function MemberAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: '李女士',
      address: '北京市朝阳区XXXX路XXXX街道XXXX小区XX栋XX单元XXXXX',
    },
    {
      id: '2',
      name: '李女士',
      address: '北京市昌平区XXXX路XXXX街道XXXX小区XX栋XX单元XXXXX',
    },
    {
      id: '3',
      name: '李女士',
      address: '北京市东城区XXXX路XXXX街道XXXX小区XX栋XX单元XXXXX',
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleEdit = (address: Address) => {
    setEditingId(address.id);
    setEditValue(address.address);
  };

  const handleSave = (id: string) => {
    setAddresses(addresses.map((a) =>
      a.id === id ? { ...a, address: editValue } : a
    ));
    setEditingId(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  const handleAdd = () => {
    const newAddress: Address = {
      id: Date.now().toString(),
      name: '李女士',
      address: '请输入新地址',
    };
    setAddresses([...addresses, newAddress]);
    setEditingId(newAddress.id);
    setEditValue(newAddress.address);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageBanner
        title="会员中心"
        titleEn="VIP Center"
        image="/images/product-1.jpg"
      />

      <Header />

      <main className="flex-1">
        <section className="section-padding bg-white">
          <div className="page-container">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <AnimatePresence>
                  {addresses.map((address, index) => (
                    <motion.div
                      key={address.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-[#FFF9E6] transition-colors"
                    >
                      <div className="w-20 text-center">
                        <span className="px-3 py-1 bg-[#F5B800] text-white text-sm rounded-full">
                          {address.name}
                        </span>
                      </div>

                      <div className="flex-1">
                        {editingId === address.id ? (
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#F5B800]"
                            autoFocus
                          />
                        ) : (
                          <span className="text-gray-700">地址：{address.address}</span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {editingId === address.id ? (
                          <div className="relative">
                            <Button
                              onClick={() => handleSave(address.id)}
                              className="bg-green-500 hover:bg-green-600"
                            >
                              <Save size={16} />
                            </Button>
                            
                            {/* Success Toast */}
                            <AnimatePresence>
                              {showSuccess && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                                  className="absolute bottom-full right-0 mb-2 whitespace-nowrap"
                                >
                                  <div className="bg-green-500 text-white px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1 text-sm">
                                    <Check size={14} />
                                    <span>已保存</span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Button
                            onClick={() => handleEdit(address)}
                            className="bg-[#F5B800] hover:bg-[#E5A800]"
                          >
                            <Edit2 size={16} />
                          </Button>
                        )}
                        <Button
                          onClick={() => handleDelete(address.id)}
                          variant="destructive"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Add Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex justify-center mt-8"
              >
                <button
                  onClick={handleAdd}
                  className="w-14 h-14 bg-[#F5B800] rounded-full flex items-center justify-center text-white hover:bg-[#E5A800] transition-colors shadow-lg hover:shadow-xl hover:scale-110 transition-all"
                >
                  <Plus size={28} />
                </button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
