import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Instagram, ShoppingCart, Menu, X, User, LogOut, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const navItems = [
  { labelKey: '最新消息', labelEn: 'News', href: '/news' },
  { labelKey: '产品推介', labelEn: 'Product', href: '/products' },
  { labelKey: '寻找分店', labelEn: 'Stores', href: '/stores' },
  { labelKey: '关于满记', labelEn: 'About US', href: '/about' },
  { labelKey: '会员中心', labelEn: 'VIP Center', href: '/vip-center' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { selectedCount } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useUser();

  const isActive = (href: string) => location.pathname === href;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white border-b border-gray-100"
    >
      <div className="page-container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl lg:text-3xl font-bold text-[#F5B800]">
              {t('满记甜品')}
            </div>
            <div className="hidden sm:block text-xs text-gray-500">
              HONEYMOON<br />DESSERT
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`group relative py-2 transition-colors ${
                  isActive(item.href)
                    ? 'text-[#F5B800]'
                    : 'text-gray-700 hover:text-[#F5B800]'
                }`}
              >
                <span className="text-sm font-medium">{t(item.labelKey)}</span>
                <span className="block text-xs text-gray-400">{item.labelEn}</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#F5B800] transform origin-left transition-transform duration-300 ${
                    isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* User Account */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 p-2 text-gray-700 hover:text-[#F5B800] transition-colors">
                    <User size={20} />
                    <span className="hidden md:inline text-sm font-medium">{user.nickname}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Link to="/vip-center" className="w-full">会员中心</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/orders" className="w-full">我的订单</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/member-addresses" className="w-full">地址管理</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-red-500">
                    <LogOut size={16} className="mr-2" />
                    退出登录
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">登录</Link>
                </Button>
                <Button size="sm" className="bg-[#F5B800] hover:bg-[#E5A800] text-white">
                  <Link to="/register">注册</Link>
                </Button>
              </div>
            )}

            {/* Social Icons */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#F5B800] flex items-center justify-center text-white hover:bg-[#E5A800] transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#F5B800] flex items-center justify-center text-white hover:bg-[#E5A800] transition-colors"
              >
                <Instagram size={16} />
              </a>
            </div>

            {/* Language Switch */}
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
              <button
                onClick={() => setLanguage('en')}
                className={`hover:text-[#F5B800] cursor-pointer transition-colors ${language === 'en' ? 'text-[#F5B800] font-medium' : ''}`}
              >
                En
              </button>
              <span>|</span>
              <button
                onClick={() => setLanguage('zh-TW')}
                className={`hover:text-[#F5B800] cursor-pointer transition-colors ${language === 'zh-TW' ? 'text-[#F5B800] font-medium' : ''}`}
              >
                繁
              </button>
              <span>|</span>
              <button
                onClick={() => setLanguage('zh-CN')}
                className={`hover:text-[#F5B800] cursor-pointer transition-colors ${language === 'zh-CN' ? 'text-[#F5B800] font-medium' : ''}`}
              >
                简
              </button>
            </div>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-[#F5B800] transition-colors"
            >
              <ShoppingCart size={22} />
              {selectedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F5B800] text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {selectedCount > 99 ? '99+' : selectedCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="lg:hidden overflow-hidden bg-white border-t"
      >
        <nav className="page-container py-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`py-3 px-4 rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'bg-[#FFF9E6] text-[#F5B800]'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="font-medium">{t(item.labelKey)}</span>
              <span className="ml-2 text-sm text-gray-400">{item.labelEn}</span>
            </Link>
          ))}
          
          {/* Mobile User Actions */}
          <div className="pt-4 border-t flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  to="/vip-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center"
                >
                  <User size={16} className="mr-2" />
                  会员中心
                </Link>
                <Link
                  to="/orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center"
                >
                  <Package size={16} className="mr-2" />
                  我的订单
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="py-3 px-4 rounded-lg text-red-500 hover:bg-gray-50 flex items-center"
                >
                  <LogOut size={16} className="mr-2" />
                  退出登录
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 px-4 rounded-lg bg-[#FFF9E6] text-[#F5B800] font-medium text-center"
                >
                  登录
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 px-4 rounded-lg bg-[#F5B800] text-white font-medium text-center"
                >
                  注册
                </Link>
              </>
            )}
          </div>
        </nav>
      </motion.div>
    </motion.header>
  );
}
