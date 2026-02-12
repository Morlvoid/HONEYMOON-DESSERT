import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAdmin } from '../context/AdminContext';


export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAdmin();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(username, password);
      navigate('/admin');
    } catch (err) {
      setError('登录失败，请检查用户名和密码');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md px-4"
      >
        <Card className="p-8 shadow-xl border-0">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#F5B800] rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">后台管理系统</h1>
            <p className="text-gray-500">请登录以访问管理面板</p>
          </div>
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">用户名</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="请输入用户名"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
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
            
            <Button
              type="submit"
              className="w-full py-6 bg-[#F5B800] hover:bg-[#E5A800] text-white font-medium"
              disabled={isLoading}
            >
              {isLoading ? '登录中...' : '登录'}
            </Button>
            
            <div className="text-center text-sm text-gray-600">
              <Link to="/" className="text-[#F5B800] hover:underline">
                返回前台
              </Link>
            </div>
          </form>
        </Card>
        
        <div className="mt-6 text-center text-xs text-gray-400">
          <p>© 2026 满记甜品后台管理系统</p>
          <p className="mt-1">版本 1.0.0</p>
        </div>
      </motion.div>
    </div>
  );
}
