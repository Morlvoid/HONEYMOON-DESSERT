import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface Admin {
  id: string;
  username: string;
  name: string;
  avatar?: string;
  role: 'superadmin' | 'admin' | 'editor';
}

interface AdminContextType {
  admin: Admin | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  getAdminInfo: () => Promise<Admin | null>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = !!admin;

  const login = useCallback(async (username: string, _password: string) => {
    setIsLoading(true);
    try {
      // 模拟登录请求
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟管理员数据
      const mockAdmin: Admin = {
        id: '1',
        username,
        name: '管理员',
        avatar: undefined,
        role: 'superadmin',
      };
      
      setAdmin(mockAdmin);
      localStorage.setItem('admin', JSON.stringify(mockAdmin));
    } catch (error) {
      console.error('登录失败:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setAdmin(null);
    localStorage.removeItem('admin');
  }, []);

  const getAdminInfo = useCallback(async () => {
    setIsLoading(true);
    try {
      // 模拟获取管理员信息请求
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const adminStr = localStorage.getItem('admin');
      if (adminStr) {
        const adminData = JSON.parse(adminStr);
        setAdmin(adminData);
        return adminData;
      }
      return null;
    } catch (error) {
      console.error('获取管理员信息失败:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AdminContext.Provider value={{
      admin,
      isLoading,
      isAuthenticated,
      login,
      logout,
      getAdminInfo,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
