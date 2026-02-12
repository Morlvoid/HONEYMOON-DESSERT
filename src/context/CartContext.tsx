import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  selected: boolean;
}

interface CartContextType {
  items: CartItem[];
  selectedCount: number;
  totalCount: number;
  addItem: (item: Omit<CartItem, 'selected'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleSelected: (id: string) => void;
  toggleAll: (selected: boolean) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: '1',
      name: '满记椰皇',
      image: '/images/product-2.jpg',
      price: 35.9,
      quantity: 1,
      selected: true,
    },
    {
      id: '2',
      name: '麻薯抹茶奶冻',
      image: '/images/product-5.jpg',
      price: 25.9,
      quantity: 1,
      selected: true,
    },
    {
      id: '3',
      name: '紫薯芋泥荷花挞',
      image: '/images/product-4.jpg',
      price: 28.0,
      quantity: 1,
      selected: true,
    },
  ]);

  const selectedCount = items.filter(item => item.selected).reduce((sum, item) => sum + item.quantity, 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const addItem = useCallback((item: Omit<CartItem, 'selected'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, { ...item, selected: true }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  }, []);

  const toggleSelected = useCallback((id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  }, []);

  const toggleAll = useCallback((selected: boolean) => {
    setItems(prev => prev.map(item => ({ ...item, selected })));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        selectedCount,
        totalCount,
        addItem,
        removeItem,
        updateQuantity,
        toggleSelected,
        toggleAll,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
