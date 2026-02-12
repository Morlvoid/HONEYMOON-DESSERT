/**
 * 应用入口文件
 * 配置路由、全局状态管理和懒加载
 */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// 全局状态管理
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import { PaymentProvider } from './context/PaymentContext';
import { OrderProvider } from './context/OrderContext';
import { CommentProvider } from './context/CommentContext';
import { AdminProvider } from './context/AdminContext';

// 路由懒加载 - 优化初始加载性能
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const Stores = lazy(() => import('./pages/Stores'));
const News = lazy(() => import('./pages/News'));
const NewsDetail = lazy(() => import('./pages/NewsDetail'));
const VIPCenter = lazy(() => import('./pages/VIPCenter'));
const MemberAddresses = lazy(() => import('./pages/MemberAddresses'));
const ShoppingCart = lazy(() => import('./pages/ShoppingCart'));
const Order = lazy(() => import('./pages/Order'));
const OrderList = lazy(() => import('./pages/OrderList'));
const Retail = lazy(() => import('./pages/Retail'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Payment = lazy(() => import('./pages/Payment'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const Admin = lazy(() => import('./pages/Admin'));

/**
 * 加载中组件
 * 当路由懒加载时显示的加载状态
 */
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-[#F5B800] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">加载中...</p>
    </div>
  </div>
);

/**
 * 应用主组件
 * 配置全局状态管理和路由
 */
function App() {
  return (
    <AdminProvider>
      <LanguageProvider>
        <UserProvider>
          <OrderProvider>
            <PaymentProvider>
              <CommentProvider>
                <CartProvider>
                  <Suspense fallback={<LoadingFallback />}>
                    <Router>
                      <Routes>
                        {/* 公共路由 */}
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/stores" element={<Stores />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/news/:id" element={<NewsDetail />} />
                        
                        {/* 用户相关路由 */}
                        <Route path="/vip-center" element={<VIPCenter />} />
                        <Route path="/member-addresses" element={<MemberAddresses />} />
                        <Route path="/cart" element={<ShoppingCart />} />
                        <Route path="/order/:id" element={<Order />} />
                        <Route path="/orders" element={<OrderList />} />
                        <Route path="/retail/:id" element={<Retail />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        
                        {/* 管理员路由 */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin" element={<Admin />} />
                      </Routes>
                    </Router>
                  </Suspense>
                </CartProvider>
              </CommentProvider>
            </PaymentProvider>
          </OrderProvider>
        </UserProvider>
      </LanguageProvider>
    </AdminProvider>
  );
}

// 导出应用组件
export default App;