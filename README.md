# ShopHaoHung - Dự Án Web Bán Đồ Thể Thao

Một ứng dụng web hiện đại để bán đồ thể thao, được xây dựng bằng **Next.js**, **React 19**, **TypeScript**, và **Tailwind CSS**.

## 🎯 Lộ Trình Dự Án

- **Tổng thời gian**: 12 tuần (6 sprint x 2 tuần)
- **Hiện tại**: Giao diện badminton storefront đã được nâng cấp với auth/account, search, cart, dashboard và tài liệu deploy
- **Công nghệ chính**: Next.js 16.2.5, React 19, TypeScript, Tailwind CSS v4, Zustand, React Hook Form, Zod

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

### Sprint 2 ✅
- [x] Auth implementation
- [x] Protected account page
- [x] User profile page
- [x] Token/session refresh flow
- [x] Account icon after login

### Sprint 2 (Upcoming)
- [x] Protected routes
- [x] User profile page
- [x] Token refresh flow

### Sprint 3 (Upcoming)
- [ ] CRUD Product module
- [ ] CRUD Order module
- [ ] Image upload functionality

### Sprint 4 (Upcoming)
- [x] Search + Filter + Pagination
- [x] Dashboard overview

### Sprint 5 (Upcoming)
- [ ] SSR/SSG/ISR
- [ ] SEO optimization
- [ ] Performance optimization

### Sprint 6 (Upcoming)
- [ ] Testing
- [ ] CI/CD
- [ ] Production deploy

## 🚀 Quick Start

### Yêu Cầu
- Node.js 18+
## 🎯 Lộ Trình Dự Án

- **Tổng thời gian**: 12 tuần (6 sprint x 2 tuần)
- **Hiện tại**: Giao diện web bán vợt cầu lông và phụ kiện đã được nâng cấp — auth/account, search, cart, dashboard, footer và tài liệu deploy
- **Công nghệ chính**: Next.js 16.2.5, React 19, TypeScript, Tailwind CSS v4, Zustand, React Hook Form, Zod

### Sprint 1 ✅
# Tạo .env.local
### Sprint 2 ✅

### Sprint 3 (Pending)
- [ ] CRUD Product module
- [ ] CRUD Order module
- [ ] Image upload functionality (pending: map first 20 images to product JSON)

│   ├── (auth)/            # Auth routes
### Sprint 4 ✅
- [x] Search + Filter + Pagination
- [x] Dashboard overview
│   ├── layout.tsx         # Root layout
### Sprint 5 (Pending)
- [ ] SSR/SSG/ISR
- [ ] SEO optimization
- [ ] Performance optimization
│   ├── layout/            # Layout components
### Sprint 6 (Pending)
- [ ] Testing
- [ ] CI/CD
- [ ] Production deploy
│   ├── api/              # API
## 🛠️ Công Nghệ

- **Next.js 16.2.5** - React framework (App Router)
- **React 19** - UI library
├── store/                # Zustand stores
├── types/                # TypeScript types
├── constants/            # App constants
└── docs/                 # Documentation
```

## 🛠️ Công Nghệ

- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
## 🚀 Deployment

App sẵn sàng deploy trên **Vercel**.

```bash
npm run build
npm run start
```

### Deploy nhanh với Vercel

1. Đăng nhập Vercel và import repository này.
2. Chọn project và branch, giữ preset Next.js.
3. Thiết lập `NEXT_PUBLIC_API_URL` nếu cần (môi trường production).
4. (Optional) To enable automatic deployments from GitHub using GitHub Actions, add these repository secrets in GitHub:
	- `VERCEL_TOKEN` — your Vercel personal token
	- `VERCEL_ORG_ID` — your Vercel organization ID
	- `VERCEL_PROJECT_ID` — the Vercel project ID
5. Push to `main` (or open a PR) and the workflow `.github/workflows/deploy-to-vercel.yml` will run and deploy your site.

Note: If you prefer manual deploy, you can still use the Vercel web UI to import the repo and deploy.
**Sprint trạng thái**: Sprints 1, 2, 4 completed; Sprints 3, 5, 6 pending.
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

- **Email**: user@example.com
- **Password**: 123456

## 📚 Tài Liệu

- [SPRINT-1.md](./docs/SPRINT-1.md) - Sprint 1 details
- [API.md](./docs/API.md) - API specification
- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) - Architecture
- [COMPONENTS.md](./docs/COMPONENTS.md) - Components

## 🚀 Deployment

App sẵn sàng deploy trên **Vercel**.

```bash
npm run build
npm run start
```

### Deploy nhanh với Vercel

1. Đăng nhập Vercel và import repository này.
2. Giữ nguyên preset Next.js mặc định.
3. Deploy production hoặc preview trực tiếp từ branch hiện tại.
4. Mở URL được Vercel cấp sau khi deploy thành công.

---

**Sprint hiện tại**: 1/6 | **Cập nhật**: Mai 2024
