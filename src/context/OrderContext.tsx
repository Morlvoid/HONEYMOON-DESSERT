import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  address?: {
    name: string;
    phone: string;
    province: string;
    city: string;
    district: string;
    detail: string;
    zipCode: string;
  };
  paymentMethod?: string;
  transactionId?: string;
}

interface OrderContextType {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  createOrder: (items: OrderItem[], total: number, address?: any) => Promise<Order>;
  getOrderById: (id: string) => Promise<Order | null>;
  getOrders: () => Promise<Order[]>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<boolean>;
  cancelOrder: (id: string) => Promise<boolean>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

// 模拟订单数据
const mockOrders: Order[] = [
  {
    id: 'ORDER1234567890',
    userId: '1',
    items: [
      {
        id: '1',
        name: '满记椰皇',
        image: '/images/product-2.jpg',
        price: 35.9,
        quantity: 1,
      },
      {
        id: '2',
        name: '麻薯抹茶奶冻',
        image: '/images/product-5.jpg',
        price: 25.9,
        quantity: 1,
      },
    ],
    total: 61.8,
    status: 'delivered',
    createdAt: '2026-02-10T10:00:00Z',
    updatedAt: '2026-02-10T14:30:00Z',
    address: {
      name: '张三',
      phone: '13800138000',
      province: '北京市',
      city: '北京市',
      district: '朝阳区',
      detail: '某某街道某某小区1号楼1单元101',
      zipCode: '100000',
    },
    paymentMethod: 'alipay',
    transactionId: 'TXN1234567890',
  },
  {
    id: 'ORDER0987654321',
    userId: '1',
    items: [
      {
        id: '3',
        name: '紫薯芋泥荷花挞',
        image: '/images/product-4.jpg',
        price: 28.0,
        quantity: 2,
      },
    ],
    total: 56.0,
    status: 'processing',
    createdAt: '2026-02-11T15:00:00Z',
    updatedAt: '2026-02-11T15:30:00Z',
    address: {
      name: '张三',
      phone: '13800138000',
      province: '北京市',
      city: '北京市',
      district: '朝阳区',
      detail: '某某街道某某小区1号楼1单元101',
      zipCode: '100000',
    },
    paymentMethod: 'wechat',
    transactionId: 'TXN0987654321',
  },
];

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createOrder = useCallback(async (items: OrderItem[], total: number, address?: any) => {
    setIsLoading(true);
    try {
      // 模拟创建订单请求
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newOrder: Order = {
        id: `ORDER${Date.now()}`,
        userId: '1', // 模拟用户ID
        items,
        total,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        address,
      };
      
      setOrders(prev => [newOrder, ...prev]);
      setCurrentOrder(newOrder);
      return newOrder;
    } catch (error) {
      console.error('创建订单失败:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getOrderById = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      // 模拟获取订单请求
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const order = orders.find(o => o.id === id) || mockOrders.find(o => o.id === id);
      if (order) {
        setCurrentOrder(order);
      }
      return order || null;
    } catch (error) {
      console.error('获取订单失败:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [orders]);

  const getOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      // 模拟获取订单列表请求
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 合并模拟数据和本地数据
      const allOrders = [...orders, ...mockOrders.filter(o => !orders.some(existing => existing.id === o.id))];
      setOrders(allOrders);
      return allOrders;
    } catch (error) {
      console.error('获取订单列表失败:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [orders]);

  const updateOrderStatus = useCallback(async (id: string, status: OrderStatus) => {
    setIsLoading(true);
    try {
      // 模拟更新订单状态请求
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setOrders(prev => prev.map(order => 
        order.id === id ? { ...order, status, updatedAt: new Date().toISOString() } : order
      ));
      
      if (currentOrder?.id === id) {
        setCurrentOrder(prev => prev ? { ...prev, status, updatedAt: new Date().toISOString() } : null);
      }
      
      return true;
    } catch (error) {
      console.error('更新订单状态失败:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [currentOrder]);

  const cancelOrder = useCallback(async (id: string) => {
    return updateOrderStatus(id, 'cancelled');
  }, [updateOrderStatus]);

  return (
    <OrderContext.Provider value={{
      orders,
      currentOrder,
      isLoading,
      createOrder,
      getOrderById,
      getOrders,
      updateOrderStatus,
      cancelOrder,
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
