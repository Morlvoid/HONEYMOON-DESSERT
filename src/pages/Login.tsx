import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useUser();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError('登录失败，请检查用户名和密码');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-16 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md px-4"
        >
          <Card className="p-8 shadow-xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('满记甜品')}</h1>
              <p className="text-gray-600">{t('手造圆满幸福感')}</p>
            </div>
            
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">{t('手机号')}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={t('请输入手机号')}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">{t('密码')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('请输入密码')}
                    className="pl-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="mr-2 rounded border-gray-300 text-[#F5B800] focus:ring-[#F5B800]"
                  />
                  <Label htmlFor="remember" className="text-sm">记住我</Label>
                </div>
                <Link to="/forgot-password" className="text-sm text-[#F5B800] hover:underline">
                  忘记密码？
                </Link>
              </div>
              
              <Button
                type="submit"
                className="w-full py-6 bg-[#F5B800] hover:bg-[#E5A800] text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? '登录中...' : t('登录')}
              </Button>
              
              <div className="text-center text-sm text-gray-600">
                还没有账号？{' '}
                <Link to="/register" className="text-[#F5B800] hover:underline">
                  立即注册
                </Link>
              </div>
            </form>
          </Card>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}
