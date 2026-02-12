import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CreditCard, Apple, CheckCircle, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { usePayment } from '../context/PaymentContext';
import { useLanguage } from '../context/LanguageContext';

export default function Payment() {
  const [searchParams] = useSearchParams();
  const [orderInfo] = useState({
    orderId: searchParams.get('orderId') || `ORDER${Date.now()}`,
    amount: parseFloat(searchParams.get('amount') || '0'),
    items: parseInt(searchParams.get('items') || '0'),
  });
  const { paymentMethod, setPaymentMethod, isProcessing, processPayment, paymentResult, resetPayment } = usePayment();
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    resetPayment();
  }, [resetPayment]);

  const handlePayment = async () => {
    if (!paymentMethod) return;
    
    const success = await processPayment(orderInfo.amount, orderInfo.orderId);
    if (success) {
      setTimeout(() => {
        navigate(`/order/${orderInfo.orderId}?status=success`);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-16 bg-gray-50">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('支付订单')}</h1>
              <p className="text-gray-600">请选择支付方式完成支付</p>
            </div>
            
            {/* Order Summary */}
            <Card className="mb-8 p-6">
              <h2 className="text-lg font-semibold mb-4">订单信息</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">订单编号</span>
                  <span className="font-medium">{orderInfo.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">商品数量</span>
                  <span>{orderInfo.items} 件</span>
                </div>
                <div className="flex justify-between border-t pt-3 mt-3">
                  <span className="text-lg font-bold">支付金额</span>
                  <span className="text-2xl font-bold text-[#F5B800]">¥{orderInfo.amount.toFixed(2)}</span>
                </div>
              </div>
            </Card>
            
            {/* Payment Methods */}
            <Card className="mb-8 p-6">
              <h2 className="text-lg font-semibold mb-4">选择支付方式</h2>
              <RadioGroup
                value={paymentMethod || ''}
                onValueChange={(value) => value && setPaymentMethod(value as any)}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="alipay" id="alipay" className="text-[#1677FF]" />
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                      <div className="text-2xl font-bold text-blue-500">支</div>
                    </div>
                    <div>
                      <Label htmlFor="alipay" className="font-medium">支付宝</Label>
                      <p className="text-sm text-gray-500">推荐使用支付宝APP扫码支付</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="wechat" id="wechat" className="text-[#07C160]" />
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                      <div className="text-2xl font-bold text-green-500">微</div>
                    </div>
                    <div>
                      <Label htmlFor="wechat" className="font-medium">微信支付</Label>
                      <p className="text-sm text-gray-500">推荐使用微信APP扫码支付</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="creditcard" id="creditcard" className="text-[#F5B800]" />
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center">
                      <CreditCard size={24} className="text-yellow-500" />
                    </div>
                    <div>
                      <Label htmlFor="creditcard" className="font-medium">银行卡支付</Label>
                      <p className="text-sm text-gray-500">支持储蓄卡、信用卡</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="applepay" id="applepay" className="text-[#000000]" />
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                      <Apple size={24} className="text-white" />
                    </div>
                    <div>
                      <Label htmlFor="applepay" className="font-medium">Apple Pay</Label>
                      <p className="text-sm text-gray-500">使用Apple设备支付</p>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </Card>
            
            {/* Payment Result */}
            {paymentResult.success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8"
              >
                <Alert className="p-6">
                  <div className="flex items-center gap-4">
                    <CheckCircle size={32} className="text-green-500 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg">支付成功</h3>
                      <p className="text-sm text-gray-600">交易编号：{paymentResult.transactionId}</p>
                      <p className="text-sm text-gray-500 mt-2">正在跳转到订单详情页...</p>
                    </div>
                  </div>
                </Alert>
              </motion.div>
            )}
            
            {paymentResult.error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8"
              >
                <Alert variant="destructive">
                  <AlertDescription>{paymentResult.error}</AlertDescription>
                </Alert>
              </motion.div>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate('/cart')}
                variant="outline"
                className="flex-1"
              >
                返回购物车
              </Button>
              <Button
                onClick={handlePayment}
                className="flex-1 bg-[#F5B800] hover:bg-[#E5A800] text-white"
                disabled={!paymentMethod || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <LoaderCircle size={18} className="mr-2 animate-spin" />
                    处理支付中...
                  </>
                ) : (
                  `确认支付 ¥${orderInfo.amount.toFixed(2)}`
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
