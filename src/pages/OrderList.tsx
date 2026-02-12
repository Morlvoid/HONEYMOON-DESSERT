import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Package, Clock, Truck, CheckCircle, XCircle, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useOrder } from '../context/OrderContext';


const statusIcons: Record<string, React.ReactNode> = {
  pending: <Clock className="w-4 h-4 text-yellow-500" />,
  paid: <CheckCircle className="w-4 h-4 text-green-500" />,
  processing: <LoaderCircle className="w-4 h-4 text-blue-500 animate-spin" />,
  shipped: <Truck className="w-4 h-4 text-indigo-500" />,
  delivered: <CheckCircle className="w-4 h-4 text-green-600" />,
  cancelled: <XCircle className="w-4 h-4 text-red-500" />,
};

const statusLabels: Record<string, string> = {
  pending: '待支付',
  paid: '已支付',
  processing: '处理中',
  shipped: '已发货',
  delivered: '已送达',
  cancelled: '已取消',
};

export default function OrderList() {
  const [isLoading, setIsLoading] = useState(true);
  const { orders, getOrders, isLoading: contextLoading } = useOrder();


  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      await getOrders();
      setIsLoading(false);
    };
    fetchOrders();
  }, [getOrders]);

  const LoadingState = () => (
    <div className="text-center py-20">
      <LoaderCircle className="w-12 h-12 text-[#F5B800] animate-spin mx-auto mb-4" />
      <p className="text-gray-600">加载订单中...</p>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-20">
      <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <p className="text-gray-500">暂无订单</p>
      <Link
        to="/products"
        className="inline-block mt-4 px-6 py-2 bg-[#F5B800] text-white rounded-full hover:bg-[#E5A800] transition-colors"
      >
        去购物
      </Link>
    </div>
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-16 bg-gray-50">
        <div className="page-container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-gray-800 mb-2">我的订单</h1>
              <p className="text-gray-600">查看您的所有订单</p>
            </motion.div>
            
            <AnimatePresence mode="wait">
              {isLoading || contextLoading ? (
                <LoadingState />
              ) : orders.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="overflow-hidden">
                        <div className="p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                            <div>
                              <h2 className="font-semibold text-lg">订单编号: {order.id}</h2>
                              <p className="text-sm text-gray-500">下单时间: {formatDate(order.createdAt)}</p>
                            </div>
                            <div className="flex items-center gap-2 mt-2 sm:mt-0">
                              {statusIcons[order.status]}
                              <span className={`text-sm font-medium ${
                                order.status === 'cancelled' ? 'text-red-500' :
                                order.status === 'delivered' ? 'text-green-600' :
                                order.status === 'pending' ? 'text-yellow-500' :
                                'text-blue-500'
                              }`}>
                                {statusLabels[order.status]}
                              </span>
                            </div>
                          </div>
                          
                          <Separator className="my-4" />
                          
                          <div className="space-y-3 mb-4">
                            {order.items.slice(0, 3).map((item) => (
                              <div key={item.id} className="flex items-center gap-4">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <h3 className="font-medium text-sm">{item.name}</h3>
                                  <p className="text-xs text-gray-500">¥{item.price.toFixed(1)} × {item.quantity}</p>
                                </div>
                                <div className="font-medium">¥{(item.price * item.quantity).toFixed(1)}</div>
                              </div>
                            ))}
                            {order.items.length > 3 && (
                              <div className="text-sm text-gray-500">共{order.items.length}件商品</div>
                            )}
                          </div>
                          
                          <Separator className="my-4" />
                          
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div className="text-lg font-bold">
                              总计: <span className="text-[#F5B800]">¥{order.total.toFixed(2)}</span>
                            </div>
                            <div className="flex gap-2 mt-3 sm:mt-0">
                              <Button asChild variant="outline" size="sm">
                                <Link to={`/order/${order.id}`}>查看详情</Link>
                              </Button>
                              {order.status === 'pending' && (
                                <Button size="sm" className="bg-[#F5B800] hover:bg-[#E5A800] text-white">
                                  去支付
                                </Button>
                              )}
                              {order.status === 'processing' && (
                                <Button variant="destructive" size="sm">
                                  取消订单
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
