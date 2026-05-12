# ShopHaoHung - Web Bán Vợt Cầu Lông & Phụ Kiện

Một ứng dụng e-commerce hiện đại để bán vợt cầu lông và phụ kiện, được xây dựng bằng **Next.js 16**, **React 19**, **TypeScript**, và **Tailwind CSS v4**.

> 🎯 **Trạng thái**: Sprints 1, 2, 3, 4 ✅ | Sprint 5 ✅ (Phase 1+2) | Sprint 6 🔄

🌐 **Live Demo**: [https://shop-hao-hung.vercel.app](https://shop-hao-hung.vercel.app?_vercel_share=SLT1g15D3ek7iB6RvSf5kCf5YXCu3isa)

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
- [x] Core Web Vitals improvement (Testing phase)

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

- **Live Demo**: [https://shop-hao-hung.vercel.app](https://shop-hao-hung.vercel.app?_vercel_share=SLT1g15D3ek7iB6RvSf5kCf5YXCu3isa)
- Thông tin đăng nhập nội bộ: Xem trang **`/demo`** (hoặc click "📊 Demo" ở header)

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

### Vercel via GitHub Actions

1. Tạo các GitHub secrets sau:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
2. Push code lên GitHub.
3. Workflow `.github/workflows/deploy-to-vercel.yml` sẽ tự deploy preview cho mỗi push/PR.
4. Nếu muốn production, vào GitHub Actions và chạy workflow thủ công, chọn `production = true`.

### GitHub Secrets

Tạo 3 secrets này trong repository settings để workflow chạy ngay:

- `VERCEL_TOKEN`: token từ Vercel Account Settings
- `VERCEL_ORG_ID`: ID team/org trên Vercel
- `VERCEL_PROJECT_ID`: ID project Vercel đã link với repo

### Cách lấy 3 secrets

1. Lấy `VERCEL_TOKEN`:
   - Đăng nhập Vercel
   - Vào `Account Settings` > `Tokens`
   - Tạo token mới và copy giá trị vừa tạo

2. Lấy `VERCEL_ORG_ID`:
   - Mở project trên Vercel hoặc chạy `vercel link`
   - `orgId` sẽ nằm trong file `.vercel/project.json` sau khi link
   - Nếu dùng team, đây là ID của team đó

3. Lấy `VERCEL_PROJECT_ID`:
   - Mở `.vercel/project.json` sau khi link project
   - Copy giá trị `projectId`

4. Thêm secrets vào GitHub:
   - Vào repository trên GitHub
   - Mở `Settings` > `Secrets and variables` > `Actions`
   - Chọn `New repository secret` và thêm 3 giá trị ở trên

5. Chạy deploy:
   - Push code lên GitHub để preview deploy tự chạy
   - Vào tab `Actions` và bấm `Run workflow` với `production = true` nếu muốn deploy production

### Product Storage

Product CRUD hiện dùng `localStorage` thay vì database.

- Dữ liệu gốc được seed từ `lib/badminton-products.json`
- Tạo/sửa/xóa sẽ cập nhật `localStorage` key `shophaohung.products`
- Shop và dashboard cùng đọc từ nguồn này để hiển thị đồng bộ

### Core Web Vitals (Testing Phase)

Mục tiêu của Sprint 5 là giữ các chỉ số chính ở mức tốt trên cả desktop và mobile.

- **LCP**: tối ưu hero image, ưu tiên tải ảnh quan trọng bằng `next/image` và `priority`
- **CLS**: cố định kích thước ảnh, layout ổn định, tránh render nhảy khi tải dữ liệu
- **INP/FID**: giảm JavaScript không cần thiết, dùng dynamic import cho component nặng
- **Tracking**: metrics được gửi qua `lib/web-vitals.ts` tới `/api/vitals`

#### Cách kiểm tra nhanh

1. Mở trang Home, Shop, Product Detail và Dashboard trên mobile viewport.
2. Chạy Lighthouse hoặc Chrome DevTools Performance.
3. Kiểm tra log từ `/api/vitals` để xem LCP, INP, CLS có bị vượt ngưỡng không.
4. Nếu cần tối ưu thêm, ưu tiên ảnh hero, bundle lớn và các component render đầu trang.

### Production Deployment Runbook

Workflow deploy nằm ở `.github/workflows/deploy-to-vercel.yml`.

#### Preview deploy

1. Push code hoặc mở Pull Request.
2. GitHub Actions sẽ chạy job preview tự động.
3. Kiểm tra URL preview trong tab Actions.

#### Production deploy

1. Vào GitHub repository > `Actions`.
2. Chọn workflow `Deploy to Vercel`.
3. Bấm `Run workflow`.
4. Chọn `production = true` để chạy job production manual.
5. Đảm bảo 3 secrets đã tồn tại: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.

#### Trước khi deploy production

- Build phải pass
- Lint và test không lỗi
- Kiểm tra lại trang `/shop`, `/dashboard/products`, `/cart`
- Xác nhận localStorage product flow vẫn hoạt động đúng

### ⚠️ Troubleshooting Next.js App Router Deployments (Vercel)

- **Lỗi `prerender-error` với `useSearchParams`**: Trong quá trình build (`npm run build`), Next.js mặc định render tĩnh các trang. Bắt buộc phải wrap các Client Component có sử dụng `useSearchParams` trong một `<Suspense>` boundary để Next.js có thể build thành công. Đã fix ở các trang Auth (Login, Signup).
- **Lỗi `sitemap.ts` (TypeError: e.some is not a function)**: File `app/sitemap.ts` trong Next.js App Router phải dùng `export default function sitemap()` và trả về một **Mảng (Array)** các route. Trình biên dịch sẽ tự động chuyển đổi thành file XML, không tự trả về chuỗi XML thủ công hoặc đối tượng `Response`.
- **Lỗi Cấu hình `vercel.json`**: Tránh sử dụng file `vercel.json` có chứa thuộc tính `builds` kiểu cũ. Vercel tự động nhận diện Next.js theo cơ chế zero-config, việc cấu hình thủ công có thể gây ghi đè và lỗi build.

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

**Last Updated**: May 12, 2026 | **Version**: 0.4.0-beta
