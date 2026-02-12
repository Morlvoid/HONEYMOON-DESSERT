import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import LazyImage from './LazyImage';

interface ProductCardProps {
  id: string;
  name: string;
  nameEn?: string;
  image: string;
  price?: number;
  showAddToCart?: boolean;
}

export default function ProductCard({
  id,
  name,
  nameEn,
  image,
  price,
  showAddToCart = true,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (price) {
      addItem({
        id,
        name,
        image,
        price,
        quantity: 1,
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <Link to={`/product/${id}`}>
        <div className="relative aspect-square overflow-hidden bg-[#FFF9E6]">
          <LazyImage
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="font-medium text-gray-800 mb-1 group-hover:text-[#F5B800] transition-colors">
            {name}
          </h3>
          {nameEn && (
            <p className="text-xs text-gray-400 mb-2">{nameEn}</p>
          )}
        </Link>
        
        <div className="flex items-center justify-between">
          {price && (
            <span className="text-lg font-bold text-[#F5B800]">
              ¥{price.toFixed(1)}
            </span>
          )}
          
          {showAddToCart && (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="w-10 h-10 rounded-full bg-[#F5B800] text-white flex items-center justify-center hover:bg-[#E5A800] transition-colors shadow-md"
              >
                <ShoppingCart size={18} />
              </motion.button>
              
              {/* Success Toast */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    className="absolute bottom-full right-0 mb-2 whitespace-nowrap z-10"
                  >
                    <div className="bg-green-500 text-white px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1 text-sm">
                      <Check size={14} />
                      <span>已添加</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
