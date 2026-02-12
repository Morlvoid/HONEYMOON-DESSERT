# 满记甜品 - React 项目

## 项目介绍

这是一个基于 React 19.2.0 + TypeScript 开发的满记甜品官方网站项目，包含完整的用户系统、支付系统、订单管理、评论系统和后台管理功能。

## 技术栈

### 核心技术
- **React 19.2.0**：前端核心框架
- **TypeScript**：类型安全
- **React Router v7.13.0**：路由管理
- **Tailwind CSS v3.4.19**：样式框架
- **Framer Motion v12.31.0**：动画效果
- **Vite v7.2.4**：构建工具

### 状态管理
- **Context API**：全局状态管理
  - UserContext：用户状态管理
  - PaymentContext：支付状态管理
  - OrderContext：订单状态管理
  - CommentContext：评论状态管理
  - AdminContext：管理员状态管理
  - CartContext：购物车状态管理
  - LanguageContext：语言状态管理

### UI 组件库
- **Radix UI**：基础 UI 组件
- **Lucide React**：图标库

### 其他依赖
- **React Hook Form**：表单管理
- **Zod**：表单验证
- **Sonner**：通知组件
- **Recharts**：图表库

## 项目结构

```
src/
├── components/          # 组件
│   ├── ui/             # UI 组件库
│   ├── Footer.tsx      # 页脚组件
│   ├── Header.tsx      # 头部组件
│   ├── LazyImage.tsx   # 懒加载图片组件
│   ├── NewsCard.tsx    # 新闻卡片组件
│   ├── PageBanner.tsx  # 页面横幅组件
│   └── ProductCard.tsx # 产品卡片组件
├── context/            # 上下文管理
│   ├── AdminContext.tsx    # 管理员上下文
│   ├── CartContext.tsx     # 购物车上下文
│   ├── CommentContext.tsx  # 评论上下文
│   ├── LanguageContext.tsx # 语言上下文
│   ├── OrderContext.tsx    # 订单上下文
│   ├── PaymentContext.tsx  # 支付上下文
│   └── UserContext.tsx     # 用户上下文
├── data/               # 模拟数据
│   ├── news.ts         # 新闻数据
│   └── products.ts     # 产品数据
├── hooks/              # 自定义钩子
│   └── use-mobile.ts   # 移动端检测钩子
├── lib/                # 工具库
│   └── utils.ts        # 工具函数
├── pages/              # 页面组件
│   ├── About.tsx           # 关于我们
│   ├── Admin.tsx           # 后台管理
│   ├── AdminLogin.tsx      # 管理员登录
│   ├── Checkout.tsx        # 结账页面
│   ├── Home.tsx            # 首页
│   ├── Login.tsx           # 用户登录
│   ├── MemberAddresses.tsx # 会员地址管理
│   ├── News.tsx            # 新闻列表
│   ├── NewsDetail.tsx      # 新闻详情
│   ├── Order.tsx           # 订单详情
│   ├── OrderList.tsx       # 订单列表
│   ├── Payment.tsx         # 支付页面
│   ├── ProductDetail.tsx   # 产品详情
│   ├── Products.tsx        # 产品列表
│   ├── Register.tsx        # 用户注册
│   ├── Retail.tsx          # 零售页面
│   ├── ShoppingCart.tsx    # 购物车
│   ├── Stores.tsx          # 门店页面
│   └── VIPCenter.tsx       # 会员中心
├── App.tsx             # 应用入口
├── index.css           # 全局样式
└── main.tsx            # 主入口
```

## 功能模块

### 1. 用户系统
- **登录/注册**：支持用户注册和登录
- **个人中心**：用户信息管理
- **地址管理**：收货地址管理

### 2. 产品系统
- **产品列表**：展示所有产品
- **产品详情**：产品详细信息和评论
- **产品分类**：按分类浏览产品

### 3. 购物车系统
- **添加商品**：将商品添加到购物车
- **购物车管理**：修改数量、删除商品
- **结算**：生成订单并跳转到支付

### 4. 订单系统
- **订单创建**：生成订单
- **订单管理**：查看历史订单
- **订单详情**：查看订单详细信息
- **订单状态**：跟踪订单状态

### 5. 支付系统
- **支付方式**：支持多种支付方式
- **支付流程**：完整的支付处理流程

### 6. 评论系统
- **产品评论**：用户可以对产品发表评论
- **评论管理**：后台管理评论

### 7. 门店系统
- **门店列表**：查看所有门店
- **门店详情**：门店详细信息
- **加盟申请**：跳转到加盟邮箱

### 8. 后台管理系统
- **仪表盘**：数据统计和概览
- **订单管理**：管理所有订单
- **产品管理**：管理产品信息
- **用户管理**：管理用户信息
- **评论管理**：管理产品评论
- **系统设置**：系统配置

## 开发指南

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建项目

```bash
npm run build
```

### 运行类型检查

```bash
npx tsc
```

### 运行 ESLint

```bash
npm run lint
```

## 部署指南

1. 构建项目：`npm run build`
2. 将 `dist` 目录上传到服务器
3. 配置服务器以支持单页应用路由

## 注意事项

1. **模拟数据**：项目使用模拟数据，实际部署时需要替换为真实 API
2. **环境变量**：敏感信息应使用环境变量管理
3. **性能优化**：已实现图片懒加载和路由懒加载
4. **响应式设计**：适配移动端和桌面端

## 后续维护建议

1. **代码规范**：遵循现有的代码风格和命名规范
2. **类型安全**：使用 TypeScript 确保类型安全
3. **组件复用**：尽量复用现有组件
4. **状态管理**：使用 Context API 管理全局状态
5. **性能优化**：注意图片优化和代码分割
6. **测试**：添加单元测试和集成测试

## 技术文档

### 路由配置

所有路由配置在 `App.tsx` 文件中，使用 React Router v7 的新语法。

### 状态管理

使用 Context API 进行状态管理，每个功能模块有独立的上下文。

### 样式管理

使用 Tailwind CSS 进行样式管理，组件样式在组件文件中直接定义。

### 组件规范

- 组件命名：使用 PascalCase
- 文件命名：与组件名一致
- Props 类型：使用 TypeScript 接口定义
- 注释：关键逻辑添加注释

### API 调用

目前使用模拟数据，实际项目中应替换为真实 API 调用。

## 常见问题

### 1. 构建失败

- 检查 TypeScript 类型错误
- 检查依赖是否安装正确

### 2. 路由无法访问

- 检查路由配置是否正确
- 检查服务器配置是否支持单页应用

### 3. 样式问题

- 检查 Tailwind CSS 配置
- 检查类名是否正确

### 4. 状态管理问题

- 检查 Context Provider 是否正确包裹
- 检查状态更新逻辑

## 版本历史

### v1.0.0
- 初始版本
- 实现核心功能模块

## 贡献指南

1. Fork 项目
2. 创建分支
3. 提交更改
4. 创建 Pull Request

## 许可证

MIT License
