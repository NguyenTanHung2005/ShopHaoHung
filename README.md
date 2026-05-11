# ShopHaoHung - Web Bán Vợt Cầu Lông & Phụ Kiện

Một ứng dụng e-commerce hiện đại để bán vợt cầu lông và phụ kiện, được xây dựng bằng **Next.js 16**, **React 19**, **TypeScript**, và **Tailwind CSS v4**.

> 🎯 **Trạng thái**: Sprints 1, 2, 3, 4 ✅ | Sprint 5 ✅ (Phase 1+2) | Sprint 6 🔄

---

## 🚀 Quick Start

### Yêu Cầu

- Node.js 20+ (hoặc 18+)
- npm hoặc yarn

### Cài Đặt

```bash
# Clone & cài dependencies
npm install

# Tạo .env.local
cp .env.example .env.local

# Chạy development server
npm run dev

# Mở http://localhost:3000
```

### Build & Production

```bash
npm run build
npm run start
```

---

## 📊 Tính Năng Chính

### 🏪 User (Khách Hàng)

- ✅ Duyệt sản phẩm với tìm kiếm, lọc, sắp xếp
- ✅ Giỏ hàng & thanh toán, lưu theo từng user đã đăng nhập
- ✅ Đăng nhập/Đăng ký tài khoản
- ✅ Quản lý hồ sơ cá nhân
- ✅ Xem lịch sử đơn hàng

### 👨‍💼 Admin (Quản Trị Viên)

- ✅ Dashboard với thống kê doanh thu, đơn hàng, người dùng
- ✅ Quản lý sản phẩm (Xem chi tiết, lọc, sắp xếp)
- ✅ Quản lý đơn hàng với bộ lọc theo trạng thái
- ✅ Quản lý người dùng (Admin/User)
- ✅ Báo cáo & phân tích
- ✅ Tải lên file & quản lý tài nguyên

### 🔐 Bảo Mật & Xác Thực

- ✅ Đăng nhập/Đăng ký với validation
- ✅ Session management với JWT token
- ✅ Cookies httpOnly cho bảo mật
- ✅ Role-based access control (RBAC) - Admin vs User
- ✅ Protected routes với middleware & AdminGuard
- ✅ Dashboard chỉ hiển thị trên header khi user là admin và cập nhật ngay sau khi đăng nhập

### ⚡ Performance & Optimization (Sprint 5)

- ✅ Image optimization với next/image (WebP/AVIF, lazy loading)
- ✅ SEO metadata & Open Graph tags
- ✅ Web Vitals tracking (LCP, FID, CLS)
- ✅ HTTP caching headers (1-hour default, 1-year for assets)
- ✅ Bundle optimization (dynamic imports, code splitting)
- ✅ Responsive image sizes & performance monitoring

---

## 📋 Lộ Trình Dự Án

### Sprint 1 ✅ - Setup & UI Base

- [x] Next.js project setup
- [x] Cấu trúc thư mục
- [x] Component library (Button, Input, Badge, Skeleton)
- [x] Routing structure (Auth, Shop, Dashboard)
- [x] Design system
- [x] Mock data & Custom hooks
- [x] Home page & Shop page

### Sprint 2 ✅ - Auth & Account

- [x] Auth implementation (login/signup/logout)
- [x] Protected routes middleware
- [x] Cookie-based sessions
- [x] Account profile page
- [x] Role-based access control
- [x] Hydration flag

### Sprint 3 ✅ - Dashboard & Admin Pages

- [x] Dashboard layout with sidebar
- [x] AdminGuard component
- [x] Dashboard overview/KPI page
- [x] Products, Orders, Users, Reports pages
- [x] File upload page
- [x] CRUD functionality (with Promise.all parallel loading)
- [x] Real API endpoints

### Sprint 4 ✅ - Search & Shop Experience

- [x] Product search & filter
- [x] Sort & pagination
- [x] Product detail page
- [x] Cart & checkout
- [x] Demo page

### Sprint 5 ✅ - Performance & Optimization (Phase 1+2)

- [x] Image optimization with next/image (WebP/AVIF)
- [x] SEO metadata & Open Graph
- [x] Performance monitoring (Web Vitals tracking)
- [x] Caching strategies (HTTP headers)
- [x] Bundle size optimization (Dynamic imports)
- [x] SSR/SSG/ISR strategy (ISR on shop listing; SSG for About/Terms)
- [ ] Core Web Vitals improvement (Testing phase)

### Sprint 6 🔄 - Testing & Deployment

- [x] Unit tests (Jest)
- [x] E2E tests (Playwright)
- [x] CI/CD (GitHub Actions)
- [ ] Production deployment

---

## 🛠️ Công Nghệ

| Công Nghệ           | Phiên Bản | Mục Đích                     |
| ------------------- | --------- | ---------------------------- |
| **Next.js**         | 16.2.5    | React framework (App Router) |
| **React**           | 19        | UI library                   |
| **TypeScript**      | 5.x       | Type safety                  |
| **Tailwind CSS**    | v4        | Styling                      |
| **Zustand**         | 4.x       | State management             |
| **React Hook Form** | 7.x       | Form handling                |
| **Zod**             | 3.x       | Validation                   |

---

## 📱 Routes & Pages

| Route                 | Type              | Status | Ghi Chú                         |
| --------------------- | ----------------- | ------ | ------------------------------- |
| `/`                   | Public            | ✅     | Home page                       |
| `/shop`               | Public            | ✅     | Product listing                 |
| `/demo`               | Public            | ✅     | Demo accounts                   |
| `/auth/login`         | Public            | ✅     | Login page                      |
| `/auth/signup`        | Public            | ✅     | Signup page                     |
| `/account`            | Protected         | ✅     | User profile                    |
| `/cart`               | Protected         | ✅     | Shopping cart, theo từng user   |
| `/dashboard`          | Protected (Admin) | ✅     | Chỉ admin thấy link trên header |
| `/dashboard/products` | Protected (Admin) | ✅     | Manage products                 |
| `/dashboard/orders`   | Protected (Admin) | ✅     | Manage orders                   |
| `/dashboard/users`    | Protected (Admin) | ✅     | Manage users                    |
| `/dashboard/reports`  | Protected (Admin) | ✅     | Analytics                       |
| `/dashboard/upload`   | Protected (Admin) | ✅     | File management                 |

---

## 🔐 Demo Credentials

### 📊 Demo Page

Xem trang demo: **`/demo`** (hoặc click "📊 Demo" ở header)

### 👨‍💼 Admin Account

```
📧 admin@example.com
🔐 123456
```

**Tính năng**: Dashboard, Quản lý sản phẩm/đơn hàng/người dùng, Báo cáo, link Dashboard hiển thị ngay ở header sau khi đăng nhập

### 👤 User Account

```
📧 user@example.com (hoặc jane@example.com)
🔐 123456
```

**Tính năng**: Mua sắm, Giỏ hàng riêng theo tài khoản, Hồ sơ cá nhân

---

## 🎨 Design System

**Colors**: Blue (#3B82F6), Gray, Green, Amber, Red  
**Typography**: Geist Font  
**Spacing**: Tailwind defaults (4px base)  
**Rounded**: md, lg, xl, 2xl, 3xl variants

**Luồng dữ liệu quan trọng**: auth state được quản lý bằng store dùng chung; khi đăng nhập/logout, header và dashboard cập nhật ngay không cần reload. Giỏ hàng được lưu theo `user.id` trong `localStorage`; khi đăng nhập sẽ nạp đúng giỏ của tài khoản hiện tại, và khi logout sẽ quay về giỏ khách.

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
git push origin main
# Auto-deploy if connected to Vercel
```

### GitHub Actions + Vercel

1. Setup GitHub secrets:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

2. Workflow file: `.github/workflows/deploy-to-vercel.yml`

3. Auto-deploy on push to `main`

---

## 📚 Documentation

- [SPRINT-1.md](./docs/SPRINT-1.md) - Setup & UI
- [SPRINT-2.md](./docs/SPRINT-2.md) - Auth & Account
- [SPRINT-3.md](./docs/SPRINT-3.md) - Dashboard & Admin
- [SPRINT-4.md](./docs/SPRINT-4.md) - Search & Shop
- [SPRINT-5.md](./docs/SPRINT-5.md) - Performance
- [SPRINT-6.md](./docs/SPRINT-6.md) - Testing & Deploy
- [API.md](./docs/API.md) - API endpoints
- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) - Architecture
- [COMPONENTS.md](./docs/COMPONENTS.md) - Components

---

**Last Updated**: May 11, 2026 | **Version**: 0.4.0-beta
