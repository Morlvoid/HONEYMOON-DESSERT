import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface Comment {
  id: string;
  productId: string;
  userId: string;
  username: string;
  avatar?: string;
  rating: number;
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
}

interface CommentContextType {
  comments: Comment[];
  isLoading: boolean;
  getCommentsByProductId: (productId: string) => Promise<Comment[]>;
  addComment: (productId: string, rating: number, content: string) => Promise<Comment>;
  likeComment: (commentId: string) => Promise<boolean>;
  deleteComment: (commentId: string) => Promise<boolean>;
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

// 模拟评论数据
const mockComments: Comment[] = [
  {
    id: '1',
    productId: '1',
    userId: '1',
    username: '张三',
    avatar: undefined,
    rating: 5,
    content: '满记椰皇真的超级好吃！椰香浓郁，口感细腻，推荐大家尝试！',
    createdAt: '2026-02-10T10:00:00Z',
    likes: 12,
    isLiked: false,
  },
  {
    id: '2',
    productId: '1',
    userId: '2',
    username: '李四',
    avatar: undefined,
    rating: 4,
    content: '味道不错，就是价格有点贵，不过值得一试。',
    createdAt: '2026-02-09T15:30:00Z',
    likes: 5,
    isLiked: true,
  },
  {
    id: '3',
    productId: '2',
    userId: '3',
    username: '王五',
    avatar: undefined,
    rating: 5,
    content: '杨枝甘露是我的最爱，满记的做得特别正宗，芒果新鲜，甜度适中。',
    createdAt: '2026-02-08T09:15:00Z',
    likes: 8,
    isLiked: false,
  },
  {
    id: '4',
    productId: '3',
    userId: '4',
    username: '赵六',
    avatar: undefined,
    rating: 4,
    content: '白雪冰口感清爽，夏天吃特别解暑，推荐给大家。',
    createdAt: '2026-02-07T14:45:00Z',
    likes: 3,
    isLiked: false,
  },
];

export function CommentProvider({ children }: { children: ReactNode }) {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [isLoading, setIsLoading] = useState(false);

  const getCommentsByProductId = useCallback(async (productId: string) => {
    setIsLoading(true);
    try {
      // 模拟获取评论请求
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const productComments = comments.filter(c => c.productId === productId) || 
        mockComments.filter(c => c.productId === productId);
      
      return productComments;
    } catch (error) {
      console.error('获取评论失败:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [comments]);

  const addComment = useCallback(async (productId: string, rating: number, content: string) => {
    setIsLoading(true);
    try {
      // 模拟添加评论请求
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newComment: Comment = {
        id: Date.now().toString(),
        productId,
        userId: '1', // 模拟当前用户ID
        username: '当前用户', // 模拟用户名
        avatar: undefined,
        rating,
        content,
        createdAt: new Date().toISOString(),
        likes: 0,
        isLiked: false,
      };
      
      setComments(prev => [newComment, ...prev]);
      return newComment;
    } catch (error) {
      console.error('添加评论失败:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const likeComment = useCallback(async (commentId: string) => {
    setIsLoading(true);
    try {
      // 模拟点赞请求
      await new Promise(resolve => setTimeout(resolve, 300));
      
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
      
      return true;
    } catch (error) {
      console.error('点赞失败:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteComment = useCallback(async (commentId: string) => {
    setIsLoading(true);
    try {
      // 模拟删除评论请求
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setComments(prev => prev.filter(comment => comment.id !== commentId));
      return true;
    } catch (error) {
      console.error('删除评论失败:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <CommentContext.Provider value={{
      comments,
      isLoading,
      getCommentsByProductId,
      addComment,
      likeComment,
      deleteComment,
    }}>
      {children}
    </CommentContext.Provider>
  );
}

export function useComment() {
  const context = useContext(CommentContext);
  if (context === undefined) {
    throw new Error('useComment must be used within a CommentProvider');
  }
  return context;
}
