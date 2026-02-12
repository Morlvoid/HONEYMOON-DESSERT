import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Package, Users, ShoppingBag, Edit, BarChart3, Settings, LogOut, Home, Plus, Search, Trash2, Pencil, Star, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAdmin } from '../context/AdminContext';
import { useOrder } from '../context/OrderContext';
import { useComment } from '../context/CommentContext';
import { products as productData } from '../data/products';

export default function Admin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const { admin, logout, isAuthenticated } = useAdmin();
  const { orders, getOrders, updateOrderStatus } = useOrder();
  const { comments, deleteComment } = useComment();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        // 获取订单数据
        await getOrders();
        
        // 获取产品数据
        setProducts(productData);
        
        // 模拟用户数据
        const mockUsers = [
          { id: '1', username: 'user1', email: 'user1@example.com', phone: '13800138000', role: 'user', createdAt: '2026-02-01' },
          { id: '2', username: 'user2', email: 'user2@example.com', phone: '13800138001', role: 'user', createdAt: '2026-02-02' },
          { id: '3', username: 'user3', email: 'user3@example.com', phone: '13800138002', role: 'user', createdAt: '2026-02-03' },
          { id: '4', username: 'admin', email: 'admin@example.com', phone: '13800138003', role: 'admin', createdAt: '2026-02-04' },
        ];
        setUsers(mockUsers);
      } catch (error) {
        console.error('获取数据失败:', error);
      }
    };

    fetchData();
  }, [isAuthenticated, navigate, getOrders]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">{stat.title}</p>
                        <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                        <div className={`flex items-center gap-1 mt-2 text-xs ${
                          stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                        }`}>
                          <span>{stat.change}</span>
                          <span>较上月</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <Icon size={24} className="text-gray-500" />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Recent Orders */}
            <Card className="overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-lg">最近订单</h3>
                <Button size="sm" variant="outline">查看全部</Button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-start justify-between p-4 border rounded-lg hover:border-[#F5B800] transition-colors">
                      <div>
                        <div className="font-medium">{order.id}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {order.items.length} 件商品 • ¥{order.total.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {new Date(order.createdAt).toLocaleString('zh-CN')}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={`${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status === 'delivered' ? '已送达' :
                           order.status === 'pending' ? '待支付' :
                           order.status === 'processing' ? '处理中' :
                           order.status === 'shipped' ? '已发货' :
                           order.status === 'cancelled' ? '已取消' :
                           order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        );

      case 'orders':
        return (
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="font-semibold text-lg">订单管理</h3>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <Input placeholder="搜索订单..." className="pl-9 w-full sm:w-64" />
                </div>
                <Select>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="订单状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部状态</SelectItem>
                    <SelectItem value="pending">待支付</SelectItem>
                    <SelectItem value="paid">已支付</SelectItem>
                    <SelectItem value="processing">处理中</SelectItem>
                    <SelectItem value="shipped">已发货</SelectItem>
                    <SelectItem value="delivered">已送达</SelectItem>
                    <SelectItem value="cancelled">已取消</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="font-medium">{order.id}</div>
                        <div className="text-xs text-gray-400">
                          {new Date(order.createdAt).toLocaleString('zh-CN')}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-gray-500">商品数量</p>
                          <p className="font-medium">{order.items.length} 件</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">订单金额</p>
                          <p className="font-medium">¥{order.total.toFixed(1)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">支付方式</p>
                          <p className="font-medium">{order.paymentMethod || '未支付'}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-xs text-gray-500">收货地址</p>
                        <p className="text-sm">
                          {order.address ? `${order.address.name} ${order.address.phone} ${order.address.province}${order.address.city}${order.address.district}${order.address.detail}` : '无地址信息'}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-4 min-w-[200px]">
                      <Badge className={`${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status === 'delivered' ? '已送达' :
                         order.status === 'pending' ? '待支付' :
                         order.status === 'processing' ? '处理中' :
                         order.status === 'shipped' ? '已发货' :
                         order.status === 'cancelled' ? '已取消' :
                         order.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Select onValueChange={(value) => updateOrderStatus(order.id, value as any)}>
                          <SelectTrigger className="w-40 text-sm">
                            <SelectValue placeholder="更新状态" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">待支付</SelectItem>
                            <SelectItem value="paid">已支付</SelectItem>
                            <SelectItem value="processing">处理中</SelectItem>
                            <SelectItem value="shipped">已发货</SelectItem>
                            <SelectItem value="delivered">已送达</SelectItem>
                            <SelectItem value="cancelled">已取消</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        );

      case 'products':
        return (
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-lg">产品管理</h3>
              <Button className="bg-[#F5B800] hover:bg-[#E5A800] text-white">
                <Plus size={16} className="mr-2" />
                新增产品
              </Button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-square bg-gray-100">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium truncate">{product.name}</h4>
                        <Badge variant="outline" className="text-sm">{product.category}</Badge>
                      </div>
                      <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="font-bold text-lg">¥{product.price.toFixed(1)}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Pencil size={14} />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-500">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        );

      case 'users':
        return (
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="font-semibold text-lg">用户管理</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input placeholder="搜索用户..." className="pl-9 w-full sm:w-64" />
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-lg">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">用户名</p>
                        <p className="font-medium">{user.username}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">邮箱</p>
                        <p className="text-sm">{user.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">手机号</p>
                        <p className="text-sm">{user.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">注册时间</p>
                        <p className="text-sm">{user.createdAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={user.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}>
                        {user.role === 'admin' ? '管理员' : '普通用户'}
                      </Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">编辑</Button>
                        <Button size="sm" variant="outline" className="text-red-500">删除</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        );

      case 'comments':
        return (
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-lg">评论管理</h3>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部评论</SelectItem>
                  <SelectItem value="approved">已审核</SelectItem>
                  <SelectItem value="pending">待审核</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-medium">{comment.username.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{comment.username}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} className={i < comment.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                              ))}
                              <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString('zh-CN')}</span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="text-red-500" onClick={() => deleteComment(comment.id)}>
                            <Trash2 size={14} className="mr-1" />
                            删除
                          </Button>
                        </div>
                        <p className="text-gray-700 mt-2">{comment.content}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <Button size="sm" variant="ghost" className="h-8 px-3">
                            <ThumbsUp size={14} className="mr-1" />
                            {comment.likes} 赞
                          </Button>
                          <Badge variant="outline" className="text-xs">产品 ID: {comment.productId}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-6">销售分析</h3>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 size={48} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">销售数据分析图表</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-6">用户增长</h3>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Users size={48} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">用户增长趋势图表</p>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'settings':
        return (
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-6">系统设置</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-4">基本设置</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">网站名称</label>
                    <Input placeholder="满记甜品" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">联系邮箱</label>
                    <Input placeholder="contact@manjiskin.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">联系电话</label>
                    <Input placeholder="400 9090 980" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">营业时间</label>
                    <Input placeholder="10:00 - 22:00" />
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium mb-4">支付设置</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h5 className="font-medium">支付宝</h5>
                      <p className="text-sm text-gray-500">启用支付宝支付</p>
                    </div>
                    <Button size="sm" variant="outline">配置</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h5 className="font-medium">微信支付</h5>
                      <p className="text-sm text-gray-500">启用微信支付</p>
                    </div>
                    <Button size="sm" variant="outline">配置</Button>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-[#F5B800] hover:bg-[#E5A800] text-white">
                保存设置
              </Button>
            </div>
          </Card>
        );

      default:
        return (
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
            <p className="text-gray-500">请选择左侧菜单查看对应内容</p>
          </div>
        );
    }
  };

  const sidebarItems = [
    { id: 'dashboard', label: '仪表盘', icon: Home },
    { id: 'orders', label: '订单管理', icon: ShoppingBag },
    { id: 'products', label: '产品管理', icon: Package },
    { id: 'users', label: '用户管理', icon: Users },
    { id: 'comments', label: '评论管理', icon: Edit },
    { id: 'analytics', label: '数据分析', icon: BarChart3 },
    { id: 'settings', label: '系统设置', icon: Settings },
  ];

  const stats = [
    {
      title: '总订单',
      value: orders.length,
      change: '+12%',
      changeType: 'positive',
      icon: ShoppingBag,
    },
    {
      title: '总用户',
      value: 1280,
      change: '+8%',
      changeType: 'positive',
      icon: Users,
    },
    {
      title: '总产品',
      value: 56,
      change: '+5%',
      changeType: 'positive',
      icon: Package,
    },
    {
      title: '总评论',
      value: comments.length,
      change: '+15%',
      changeType: 'positive',
      icon: Edit,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: isSidebarOpen ? 250 : 80 }}
        animate={{ width: isSidebarOpen ? 250 : 80 }}
        transition={{ duration: 0.3 }}
        className="bg-white border-r border-gray-200 fixed left-0 top-0 h-full z-20 overflow-y-auto"
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <motion.div
            initial={{ opacity: isSidebarOpen ? 1 : 0 }}
            animate={{ opacity: isSidebarOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-[#F5B800] rounded-full flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            {isSidebarOpen && <h1 className="text-lg font-bold">后台管理</h1>}
          </motion.div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={`/admin?tab=${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.id);
                }}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-[#FFF9E6] text-[#F5B800]'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                {isSidebarOpen && <span>{item.label}</span>}
                {item.id === 'orders' && orders.length > 0 && (
                  <Badge className="ml-auto bg-[#F5B800] text-white">{orders.length}</Badge>
                )}
              </Link>
            );
          })}
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="font-medium">{admin?.name.charAt(0) || 'A'}</span>
            </div>
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{admin?.name || '管理员'}</p>
                <p className="text-xs text-gray-500 truncate">{admin?.username || 'admin'}</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className={`flex-1 ml-${isSidebarOpen ? 250 : 80} transition-all duration-300 min-h-screen`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">{sidebarItems.find(item => item.id === activeTab)?.label || '仪表盘'}</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="搜索..."
                  className="pl-10 w-64"
                />
              </div>
              <Button size="sm" className="bg-[#F5B800] hover:bg-[#E5A800] text-white">
                <Plus size={16} className="mr-2" />
                新增
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
}
