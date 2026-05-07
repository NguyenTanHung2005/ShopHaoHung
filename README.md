# Sports Shop - Dự Án Web Bán Đồ Thể Thao

Một ứng dụng web hiện đại để bán đồ thể thao, được xây dựng bằng **Next.js**, **React 19**, **TypeScript**, và **Tailwind CSS**.

## 🎯 Lộ Trình Dự Án

- **Tổng thời gian**: 12 tuần (6 sprint x 2 tuần)
- **Hiện tại**: Sprint 1 (Setup, UI base, Routing, Design System, Mock Data)
- **Công nghệ chính**: Next.js 15, React 19, TypeScript, Tailwind CSS, Zustand, React Hook Form, Zod

## 📋 Danh Sách Sprint

### Sprint 1 ✅ (Hiện tại)
- [x] Setup project + dependencies
- [x] Routing structure (Auth, Shop, Dashboard)
- [x] Component library (Button, Input, Skeleton)
- [x] Design system cơ bản (colors, typography, spacing)
- [x] Mock data (Products, Users, Orders)
- [x] Custom hooks (useAuth, useDebounce, useFetch)
- [x] State management (Zustand - Cart, UI)
- [x] Home page + Shop page

### Sprint 2 (Upcoming)
- [ ] Auth implementation
- [ ] Protected routes
- [ ] User profile page
- [ ] Token refresh flow

### Sprint 3 (Upcoming)
- [ ] CRUD Product module
- [ ] CRUD Order module
- [ ] Image upload functionality

### Sprint 4 (Upcoming)
- [ ] Search + Filter + Pagination
- [ ] Dashboard overview

### Sprint 5 (Upcoming)
- [ ] SSR/SSG/ISR
- [ ] SEO optimization
- [ ] Performance optimization

### Sprint 6 (Upcoming)
- [ ] Testing
- [ ] CI/CD
- [ ] Deploy to Vercel

## 🚀 Quick Start

### Yêu Cầu
- Node.js 18+
- npm hoặc yarn

### Cài Đặt

```bash
# Clone repository
git clone <repo-url>
cd sports-shop

# Cài dependencies
npm install

# Tạo .env.local
cp .env.example .env.local

# Chạy dev server
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem app.

## 📁 Cấu Trúc Thư Mục

```
sports-shop/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes
│   ├── (dashboard)/       # Dashboard routes
│   ├── (shop)/            # Shop routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── common/            # UI components
│   ├── layout/            # Layout components
│   └── product/           # Product components
├── hooks/                 # Custom hooks
├── lib/                   # Utilities
│   ├── api/              # API
│   ├── utils/            # Helpers
│   └── mock-data.ts      # Mock data
├── store/                # Zustand stores
├── types/                # TypeScript types
├── constants/            # App constants
└── docs/                 # Documentation
```

## 🛠️ Công Nghệ

- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Hook Form** - Form handling
- **Zod** - Validation
- **TanStack React Query** - Data fetching
- **ESLint + Prettier** - Code quality
- **Husky** - Git hooks

## 📖 API Endpoints (Mock)

```
GET  /api/products         - Danh sách sản phẩm
GET  /api/products/:id     - Chi tiết sản phẩm
POST /api/auth/login       - Đăng nhập
POST /api/auth/signup      - Đăng ký
```

## 🎨 Design System

- **Primary**: Blue (#3B82F6)
- **Secondary**: Gray
- **Success**: Green
- **Error**: Red

## 🔐 Demo Credentials

- **Email**: demo@example.com
- **Password**: 123456

## 📚 Tài Liệu

- [SPRINT-1.md](./docs/SPRINT-1.md) - Sprint 1 details
- [API.md](./docs/API.md) - API specification
- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) - Architecture
- [COMPONENTS.md](./docs/COMPONENTS.md) - Components

## 🚀 Deployment

App sẽ được deploy trên **Vercel** ở Sprint 6.

```bash
npm run build
npm run start
```

---

**Sprint hiện tại**: 1/6 | **Cập nhật**: Mai 2024
