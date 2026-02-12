import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, ChevronLeft, ChevronRight, Send, ThumbsUp, Trash2, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useComment } from '../context/CommentContext';

import { getProductById } from '../data/products';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product] = useState(getProductById(id || '') || null);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(5);
  const [commentContent, setCommentContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  
  const { addItem } = useCart();
  const { getCommentsByProductId, addComment, likeComment, deleteComment } = useComment();

  const navigate = useNavigate();

  useEffect(() => {
    if (!id || !product) {
      navigate('/products');
      return;
    }

    const fetchComments = async () => {
      setIsLoadingComments(true);
      const productComments = await getCommentsByProductId(id);
      setComments(productComments);
      setIsLoadingComments(false);
    };

    fetchComments();
  }, [id, product, navigate, getCommentsByProductId]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity,
    });
  };

  const handleSubmitComment = async () => {
    if (!product || !commentContent.trim()) return;
    
    setIsSubmitting(true);
    try {
      const newComment = await addComment(product.id, rating, commentContent);
      setComments(prev => [newComment, ...prev]);
      setCommentContent('');
      setRating(5);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('提交评论失败:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    await likeComment(commentId);
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked,
        };
      }
      return comment;
    }));
  };

  const handleDeleteComment = async (commentId: string) => {
    const success = await deleteComment(commentId);
    if (success) {
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN');
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star
        key={index}
        size={16}
        className={`${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500">产品不存在</p>
            <Link to="/products" className="mt-4 inline-block px-6 py-2 bg-[#F5B800] text-white rounded-full hover:bg-[#E5A800] transition-colors">
              返回产品列表
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="page-container py-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link to="/" className="hover:text-[#F5B800] transition-colors">首页</Link>
              <ChevronRight size={16} />
              <Link to="/products" className="hover:text-[#F5B800] transition-colors">产品</Link>
              <ChevronRight size={16} />
              <span className="text-gray-800 font-medium">{product.name}</span>
            </div>
          </div>
        </div>
        
        {/* Product Detail */}
        <div className="page-container py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </motion.div>
            
            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-2">
                <span className="px-3 py-1 bg-[#F5B800]/10 text-[#F5B800] text-sm rounded-full">{product.category}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <p className="text-gray-500 mb-4">{product.nameEn}</p>
              <div className="flex items-center gap-2 mb-6">
                <div className="text-2xl font-bold text-[#F5B800]">¥{product.price.toFixed(1)}</div>
              </div>
              
              <p className="text-gray-600 mb-8">{product.description || '暂无详细描述'}</p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Label htmlFor="quantity">数量</Label>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#F5B800] hover:bg-[#E5A800] text-white"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  加入购物车
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                >
                  <Heart size={18} className="mr-2" />
                  收藏
                </Button>
              </div>
            </motion.div>
          </div>
          
          {/* Comments Section */}
          <div className="mt-16">
            <Separator className="mb-8" />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-8">用户评价 ({comments.length})</h2>
              
              {/* Add Comment */}
              <Card className="p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">发表评价</h3>
                
                {submitSuccess && (
                  <Alert className="mb-4">
                    <AlertDescription>评论提交成功！</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-4">
                  <div>
                    <Label className="block mb-2">评分</Label>
                    <div className="flex items-center gap-2">
                      {Array(5).fill(0).map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setRating(index + 1)}
                          className="cursor-pointer"
                        >
                          <Star
                            size={24}
                            className={`${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="comment" className="block mb-2">评价内容</Label>
                    <Textarea
                      id="comment"
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      placeholder="请输入您的评价..."
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                  
                  <Button
                    onClick={handleSubmitComment}
                    disabled={!commentContent.trim() || isSubmitting}
                    className="bg-[#F5B800] hover:bg-[#E5A800] text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <LoaderCircle size={18} className="mr-2 animate-spin" />
                        提交中...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        提交评价
                      </>
                    )}
                  </Button>
                </div>
              </Card>
              
              {/* Comments List */}
              <div>
                <h3 className="text-lg font-semibold mb-4">全部评价</h3>
                
                {isLoadingComments ? (
                  <div className="text-center py-12">
                    <LoaderCircle className="w-8 h-8 text-[#F5B800] animate-spin mx-auto mb-4" />
                    <p className="text-gray-500">加载评价中...</p>
                  </div>
                ) : comments.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">暂无评价，快来发表第一条评价吧！</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <Card key={comment.id} className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="font-medium text-gray-600">{comment.username.charAt(0)}</span>
                            </div>
                            <div>
                              <h4 className="font-medium">{comment.username}</h4>
                              <div className="flex items-center gap-1 mt-1">
                                {renderStars(comment.rating)}
                                <span className="text-sm text-gray-500 ml-2">{formatDate(comment.createdAt)}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <button
                              onClick={() => handleLikeComment(comment.id)}
                              className={`flex items-center gap-1 text-sm ${
                                comment.isLiked ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'
                              }`}
                            >
                              <ThumbsUp size={16} />
                              <span>{comment.likes}</span>
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{comment.content}</p>
                        
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-red-500 hover:text-red-600 text-sm flex items-center gap-1"
                          >
                            <Trash2 size={14} />
                            删除
                          </button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
