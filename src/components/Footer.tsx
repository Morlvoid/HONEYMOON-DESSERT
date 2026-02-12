import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone } from 'lucide-react';

const footerLinks = [
  { label: '最新消息', href: '/news' },
  { label: '寻找分店', href: '/stores' },
  { label: '会员中心', href: '/vip-center' },
  { label: '关于满记', href: '/about' },
];

export default function Footer() {
  return (
    <footer className="bg-[#F5F5F5] pt-12 pb-6">
      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-bold text-[#F5B800] mb-2">满记甜品</div>
            <div className="text-xs text-gray-500 mb-4">HONEYMOON DESSERT</div>
            <p className="text-sm text-gray-600 leading-relaxed">
              自1995年，从平凡的芝麻绿豆做起，坚持手造甜品的理念。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">快速链接</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-600 hover:text-[#F5B800] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">联系我们</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={16} className="text-[#F5B800]" />
                <span>+852 2791-7387</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={16} className="text-[#F5B800]" />
                <span>info@honeymoon-dessert.com</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">关注我们</h4>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#F5B800] flex items-center justify-center text-white hover:bg-[#E5A800] transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#F5B800] flex items-center justify-center text-white hover:bg-[#E5A800] transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              © 2019 满记集团有限公司 版权所有
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <a href="#" className="hover:text-[#F5B800] transition-colors">
                隐私政策
              </a>
              <span>|</span>
              <a href="#" className="hover:text-[#F5B800] transition-colors">
                使用条款
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
