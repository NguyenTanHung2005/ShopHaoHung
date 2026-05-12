# Sprint 1 - Setup, UI Base & Routing

**Thời gian**: 2 tuần (Tuần 1-2)  
**Trạng thái**: ✅ Completed

## 📌 Mục Tiêu Sprint

- [x] Khởi tạo Next.js project
- [x] Thiết lập project structure
- [x] Tạo component library cơ bản
- [x] Implement routing structure
- [x] Tạo mock data
- [x] Design system & styling
- [x] Custom hooks

## ✅ Tasks Hoàn Thành

### 1. Project Setup
- [x] Tạo Next.js 15 project với TypeScript
- [x] Cài ESLint, Prettier, Husky
- [x] Cài dependencies: Zustand, React Hook Form, Zod, TanStack React Query
- [x] Cấu hình tsconfig.json, next.config.js
- [x] Tạo .env.example

### 2. Cấu Trúc Thư Mục
```
├── app/
│   ├── (auth)/          # Auth layout group
│   │   ├── login/
│   │   ├── signup/
│   │   └── layout.tsx
│   ├── (shop)/          # Shop layout group
│   │   ├── shop/
│   │   └── layout.tsx
│   ├── (dashboard)/     # Dashboard layout group
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/
│   ├── common/          # Button, Input, Skeleton
│   ├── layout/          # Header, Footer, RootLayout
│   ├── product/         # ProductCard
├── hooks/               # useAuth, useDebounce, useFetch
├── lib/
│   ├── mock-data.ts     # Mock products, users, orders
│   ├── api/
│   └── utils/
├── store/               # Zustand stores (cartStore, uiStore)
├── types/               # TypeScript interfaces
├── constants/           # App constants
└── docs/                # Documentation
```

### 3. Component Library

#### Common Components
- **Button**: Primary, Secondary, Outline variants (sm, md, lg)
- **Input**: With label, error, helper text
- **Skeleton**: ProductSkeleton, CardSkeleton

#### Layout Components
- **Header**: Navigation, Auth links
- **Footer**: Links, social media
- **RootLayout**: Wrapper component

#### Product Components
- **ProductCard**: Display product with image, price, rating

### 4. Routing Structure

| Route | Purpose | Status |
|-------|---------|--------|
| `/` | Home page | ✅ |
| `/shop` | Shop page (search, filter, sort) | ✅ |
| `/auth/login` | Login page | ✅ |
| `/auth/signup` | Signup page | ✅ |
| `/cart` | Cart page | 🔄 Sprint 2 |
| `/account` | User profile | 🔄 Sprint 2 |
| `/dashboard` | Admin dashboard | 🔄 Sprint 5 |

### 5. Custom Hooks

```typescript
// useAuth - Auth state management
const { user, token, isAuthenticated, login, logout, signup } = useAuth();

// useDebounce - Debounce values
const debouncedSearch = useDebounce(searchTerm, 300);

// useFetch - Data fetching
const { data, loading, error, refetch } = useFetch<T>(url, options);
```

### 6. State Management (Zustand)

#### cartStore
- `items`: CartItem[]
- `total`: number
- `addItem(product, quantity)`
- `removeItem(productId)`
- `updateQuantity(productId, quantity)`
- `clearCart()`

#### uiStore
- `toasts`: Toast[]
- `addToast(message, type, duration)`
- `removeToast(id)`
- `clearToasts()`

### 7. Mock Data

**Products**: 8 sản phẩm (Shoes, Apparel, Accessories, Equipment)
**Users**: 3 người dùng (1 admin, 2 users)
**Orders**: 2 đơn hàng mẫu

Dữ liệu được load từ `/lib/mock-data.ts`

### 8. Pages Tạo Trong Sprint 1

#### Home Page (/)
- Hero section
- Features showcase
- CTA button

#### Shop Page (/shop)
- Search input
- Category filter
- Sort dropdown
- Product grid (8 products)
- No results handling

#### Auth Pages (/auth/login, /auth/signup)
- Form with validation (React Hook Form + Zod)
- Email, password validation
- Demo credentials info

### 9. Design System

**Colors**:
- Primary Blue: `#3B82F6` (blue-600)
- Gray: `#6B7280` (gray-600)
- Success: `#10B981` (green-600)
- Error: `#EF4444` (red-600)

**Typography**:
- Headings: Font weight 600-700
- Body: Font weight 400-500
- Base font size: 16px

**Spacing**: Tailwind default scale (4px units)

**Components**: Tailwind + custom CSS

### 10. Technologies

| Tech | Version | Purpose |
|------|---------|---------|
| Next.js | 15 | Framework |
| React | 19 | UI Library |
| TypeScript | - | Type Safety |
| Tailwind CSS | - | Styling |
| Zustand | 4.x | State Management |
| React Hook Form | 7.x | Form Handling |
| Zod | 3.x | Validation |
| TanStack React Query | 5.x | Data Fetching |
| ESLint | - | Linting |
| Prettier | - | Formatting |

## 🔄 Next Steps (Sprint 2)

- [ ] Implement real authentication
- [ ] Protected routes middleware
- [ ] User profile page
- [ ] Token refresh flow
- [ ] Cart page
- [ ] Checkout flow

## 📊 Metrics

- **Components Created**: 7
- **Custom Hooks**: 3
- **Pages**: 5
- **Mock Data Items**: 13
- **Lines of Code**: ~1500+

## 🚀 Demo Credentials

```
Email: demo@example.com
Password: 123456
```

---

**Sprint Status**: ✅ Completed  
**Sprint Date**: 01-12 May 2024  
**Next Sprint**: Sprint 2 - Auth & Protected Routes
