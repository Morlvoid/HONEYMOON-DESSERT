import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type PaymentMethod = 'alipay' | 'wechat' | 'creditcard' | 'applepay';

interface PaymentContextType {
  paymentMethod: PaymentMethod | null;
  setPaymentMethod: (method: PaymentMethod) => void;
  isProcessing: boolean;
  processPayment: (amount: number, orderId: string) => Promise<boolean>;
  paymentResult: {
    success: boolean;
    transactionId: string | null;
    error: string | null;
  };
  resetPayment: () => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState({
    success: false,
    transactionId: null as string | null,
    error: null as string | null,
  });

  const processPayment = useCallback(async (_amount: number, _orderId: string) => {
    setIsProcessing(true);
    setPaymentResult({ success: false, transactionId: null, error: null });

    try {
      // 模拟支付请求
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 模拟支付成功
      const transactionId = `TXN${Date.now()}`;
      
      setPaymentResult({
        success: true,
        transactionId,
        error: null,
      });
      
      return true;
    } catch (error) {
      setPaymentResult({
        success: false,
        transactionId: null,
        error: '支付失败，请稍后重试',
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const resetPayment = useCallback(() => {
    setPaymentMethod(null);
    setPaymentResult({ success: false, transactionId: null, error: null });
  }, []);

  return (
    <PaymentContext.Provider
      value={{
        paymentMethod,
        setPaymentMethod,
        isProcessing,
        processPayment,
        paymentResult,
        resetPayment,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
}
