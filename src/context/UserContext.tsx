/**
 * 用户状态管理上下文
 * 处理用户登录、注册、登出和信息更新
 */
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

/**
 * 用户类型定义
 */
interface User {
  id: string;           // 用户ID
  username: string;     // 用户名/手机号
  email: string;        // 邮箱
  phone: string;        // 手机号
  nickname: string;     // 昵称
  gender: 'male' | 'female' | 'other'; // 性别
  avatar?: string;      // 头像（可选）
}

/**
 * 用户上下文类型定义
 */
interface UserContextType {
  user: User | null;    // 当前用户
  isLoading: boolean;   // 加载状态
  login: (username: string, password: string) => Promise<void>; // 登录
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>; // 注册
  logout: () => void;   // 登出
  updateUser: (userData: Partial<User>) => void; // 更新用户信息
}

// 创建用户上下文
const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * 用户状态管理提供者
 * @param children 子组件
 */
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);     // 用户状态
  const [isLoading, setIsLoading] = useState(false);       // 加载状态

  /**
   * 用户登录
   * @param username 用户名/手机号
   * @param _password 密码（当前使用模拟数据，未实际验证）
   */
  const login = useCallback(async (username: string, _password: string) => {
    setIsLoading(true);
    try {
      // 模拟登录请求延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟用户数据
      const mockUser: User = {
        id: '1',
        username,
        email: `${username}@example.com`,
        phone: '13800138000',
        nickname: username,
        gender: 'other',
      };
      
      // 更新状态并存储到本地
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('登录失败:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 用户注册
   * @param userData 用户注册数据
   */
  const register = useCallback(async (userData: Omit<User, 'id'> & { password: string }) => {
    setIsLoading(true);
    try {
      // 模拟注册请求延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟用户数据
      const mockUser: User = {
        id: Date.now().toString(),
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        nickname: userData.nickname,
        gender: userData.gender,
      };
      
      // 更新状态并存储到本地
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('注册失败:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 用户登出
   */
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  /**
   * 更新用户信息
   * @param userData 要更新的用户数据
   */
  const updateUser = useCallback((userData: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const updatedUser = { ...prev, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, login, register, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

/**
 * 用户上下文钩子
 * @returns 用户上下文
 * @throws 当不在 UserProvider 内使用时抛出错误
 */
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
