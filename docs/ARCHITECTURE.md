# Architecture Overview

## Dự Án: ShopHaoHung Web Application

### 🏗️ Kiến Trúc Tổng Quát

```
┌─────────────────────────────────────────────────────────┐
│                    Client (Browser)                     │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │           Next.js 15 (App Router)                 │ │
│  │                                                    │ │
│  │  ┌──────────────────────────────────────────────┐ │ │
│  │  │  Pages (Home, Shop, Auth, Dashboard)        │ │ │
│  │  └──────────────────────────────────────────────┘ │ │
│  │                      │                             │ │
│  │  ┌──────────────────▼──────────────────────────┐ │ │
│  │  │  React 19 Components                       │ │ │
│  │  │  - Header, Footer, ProductCard, Form      │ │ │
│  │  └──────────────────────────────────────────────┘ │ │
│  │                      │                             │ │
│  │  ┌──────────────────┼──────────────────────────┐ │ │
│  │  │  State Management (Zustand)                │ │ │
│  │  │  - cartStore, uiStore                      │ │ │
│  │  └──────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
└─────────────────────────────────────────────────────────┘
      │
      │ Data Access
      │
┌───────▼─────────────────────────────────────────────────┐
│            Shared Product Storage Layer                │
│                                                          │
│  lib/product-storage.ts                                │
│  - getStoredProducts()                                 │
│  - getStoredProduct()                                  │
│  - createStoredProduct()                               │
│  - updateStoredProduct()                               │
│  - deleteStoredProduct()                               │
│                                                          │
│  localStorage key: shophaohung.products                 │
│  Seed data: lib/badminton-products.json                │
└──────────────────────────────────────────────────────────┘
```

### 📁 Directory Structure & Responsibilities

```
shop-haohung/
├── app/
│   ├── (auth)/               # Auth layout group
│   │   ├── login/
│   │   │   └── page.tsx      # Login form with validation
│   │   ├── signup/
│   │   │   └── page.tsx      # Signup form with validation
│   │   ├── layout.tsx        # Auth layout (centered form)
│   │   └── middleware        # Auth guards
│   │
│   ├── (shop)/               # Shop layout group
│   │   ├── shop/
│   │   │   └── page.tsx      # Shop with search, filter, sort
│   │   └── layout.tsx        # Shop layout
│   │
│   ├── (dashboard)/          # Admin dashboard (Sprint 5)
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── layout.tsx            # Root layout (Header, Footer)
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
│
├── components/               # React Components
│   ├── common/               # Reusable UI components
│   │   ├── Button.tsx        # Button component
│   │   ├── Input.tsx         # Input component
│   │   ├── Skeleton.tsx      # Loading skeleton
│   │   └── index.ts          # Barrel export
│   │
│   ├── layout/               # Layout components
│   │   ├── Header.tsx        # Navigation header
│   │   ├── Footer.tsx        # Footer
│   │   ├── RootLayout.tsx    # Main layout wrapper
│   │   └── index.ts
│   │
│   └── product/              # Product-specific components
│       ├── ProductCard.tsx   # Product display card
│       └── index.ts
│
├── hooks/                    # Custom React hooks
│   ├── useAuth.ts           # Auth state & logic
│   ├── useDebounce.ts       # Debounce utility
│   ├── useFetch.ts          # Data fetching
│   └── index.ts             # Barrel export
│
├── lib/                      # Utilities & services
│   ├── api/                 # API integration (Future)
│   │   ├── apiClient.ts
│   │   └── endpoints.ts
│   │
│   ├── utils/               # Helper functions
│   │   ├── validation.ts
│   │   └── formatters.ts
│   │
│   ├── mock-data.ts         # Mock data (Sprint 1)
│   ├── product-storage.ts   # Shared localStorage-backed product store
│   └── constants.ts
│
├── store/                    # Zustand state stores
│   ├── cartStore.ts         # Shopping cart state
│   ├── uiStore.ts           # UI state (toasts, modals)
│   ├── authStore.ts         # Auth state (Future)
│   └── index.ts
│
├── types/                    # TypeScript type definitions
│   ├── index.ts             # All types
│   ├── user.ts              # User types
│   ├── product.ts           # Product types
│   └── order.ts             # Order types
│
├── constants/               # App-wide constants
│   ├── index.ts
│   ├── api.ts              # API endpoints
│   └── messages.ts         # UI messages
│
├── public/                  # Static assets
│   ├── assets/             # Images
│   └── icons/              # SVG icons
│
├── docs/                    # Documentation
│   ├── SPRINT-1.md         # Sprint 1 details
│   ├── ARCHITECTURE.md     # This file
│   ├── API.md              # API documentation
│   └── COMPONENTS.md       # Component guide
│
├── .env.example            # Environment variables template
├── .env.local              # Local environment variables
├── eslint.config.js        # ESLint configuration
├── .prettierrc.json        # Prettier configuration
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies
└── README.md               # Project readme
```

### 🔄 Data Flow

#### Page Load Flow
```
User visits /shop
      │
      ▼
Next.js renders page (Server Component)
      │
      ▼
React loads Shop page component (Client Component)
      │
      ├─→ useFetch() → Load products from localStorage helper
      │        │
      │        ▼
      │     getStoredProducts() / getStoredProduct()
      │
      ├─→ useDebounce() → Debounce search
      │
      ├─→ useCartStore() → Get cart state
      │
      └─→ Render ProductGrid with data
```

#### State Management Flow
```
User Action (Add to Cart)
      │
      ▼
ProductCard onClick handler
      │
      ▼
Call useCartStore().addItem()
      │
      ▼
Zustand updates store
      │
      ▼
Component re-renders with new cart total
      │
      ▼
useUIStore().addToast() → Show success message
```

#### Product CRUD Flow
```
Admin creates/edits/deletes product
      │
      ▼
Shared product storage helper in lib/product-storage.ts
      │
      ├─→ write to localStorage key shophaohung.products
      ├─→ seed from lib/badminton-products.json on first load
      └─→ emit storage change event
      │
      ▼
Dashboard products page and shop pages re-read data
      │
      ▼
New product appears immediately in list and detail views
```

### 🛠️ Component Hierarchy

```
RootLayout
├── Header
│   ├── Logo
│   ├── Navigation
│   └── AuthLinks
│
├── main (children)
│   └── Page content varies by route
│       ├── Home Page
│       ├── Shop Page
│       │   ├── SearchBar
│       │   ├── Filters
│       │   └── ProductGrid
│       │       └── ProductCard (×n)
│       │           ├── Image
│       │           ├── Name
│       │           ├── Price
│       │           └── AddToCartButton
│       │
│       └── Auth Page
│           └── Form
│               ├── Input (email)
│               ├── Input (password)
│               └── SubmitButton
│
└── Footer
    ├── Links
    ├── Social
    └── Copyright
```

### 🔐 Authentication Flow (Sprint 1 - Mock)

```
User fills login form
      │
      ▼
Form validation with Zod
      │
      ▼
useAuth().login() called
      │
      ▼
Mock authentication (no real API)
      │
      ▼
Store user & token in localStorage
      │
      ▼
Redirect to home page
      │
      ▼
Header updates to show user name & logout button
```

*Note: Real authentication will be implemented in Sprint 2*

### 🎯 State Management Strategy

#### Global State (Zustand)
- **cartStore**: Shopping cart items & total
- **uiStore**: Toast notifications, modals, loading states

#### Local State (React useState)
- Form inputs
- UI toggles (dropdowns, modals)
- Temporary filters on shop page
- Product form state in dashboard CRUD screens

#### Client Storage (localStorage)
- `shophaohung.products`: shared product catalog for admin CRUD and public shop views
- Seeded from mock data on first load, then updated by create/edit/delete actions

#### Server State (React Query) - Future
- User data
- Product data
- Order history

### 📊 Data Models

#### Product
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;          // in VND
  category: string;       // shoes, apparel, accessories, equipment
  image: string;
  stock: number;
  rating: number;
  reviews: number;
  createdAt: string;
  updatedAt: string;
}
```

#### User
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}
```

#### Order
```typescript
interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}
```

### 🚀 Performance Considerations

1. **Code Splitting**: Each route loads its own code
2. **Image Optimization**: Next.js Image component
3. **Lazy Loading**: Components loaded on demand
4. **Memoization**: React.memo for ProductCard
5. **useCallback**: Prevent unnecessary re-renders
6. **Debouncing**: Search input debounced

### 🔄 Future Improvements (Sprints 2-6)

- [ ] Real API integration (Sprint 2)
- [ ] Server-side rendering (Sprint 3)
- [ ] Caching strategy (Sprint 4)
- [ ] CDN for images (Sprint 5)
- [ ] Performance monitoring (Sprint 6)

---

**Last Updated**: Mai 2024  
**Architecture Version**: 1.0  
**Target**: 12-week development cycle
