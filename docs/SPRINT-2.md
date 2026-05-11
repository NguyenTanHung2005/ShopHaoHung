# Sprint 2 - Auth & Protected Routes

**Thời gian**: Tuần 3-4  
**Trạng thái**: ✅ Completed

## 📌 Mục Tiêu Sprint

- [x] Login / signup / logout via mock API
- [x] Cookie-based session for route protection
- [x] Protected routes middleware
- [x] Refresh session flow
- [x] Account page with profile
- [x] Role-based access control (RBAC)
- [x] Hydration flag to prevent flickering
- [x] Account icon in header

## ✅ Tasks Hoàn Thành

### 1. Authentication System
- [x] Login route handler (`/api/auth/login`)
  - Email validation
  - Password check (mock: all passwords are "123456")
  - User lookup from MOCK_USERS
  - JWT token generation
  - HttpOnly cookie storage

- [x] Signup route handler (`/api/auth/signup`)
  - Email & password validation with Zod
  - Create new user or assign existing role
  - Auto-login after signup

- [x] Logout route handler (`/api/auth/logout`)
  - Clear cookies
  - Clear localStorage session

### 2. useAuth Hook
- [x] Auth state management (user, token, isHydrated)
- [x] Session persistence with localStorage
- [x] isHydrated flag to prevent SSR mismatch
- [x] Login/signup/logout callbacks
- [x] Auto-restore session on page load

### 3. Protected Routes
- [x] Middleware for `/account`, `/cart`
- [x] Redirect unauthenticated users to `/auth/login`
- [x] Query parameter for post-login redirect

### 4. Account Page
- [x] User profile display
- [x] User information (name, email, role, join date)
- [x] Avatar display (placeholder)
- [x] Logout button
- [x] Edit profile entry point

### 5. Role-Based Access Control
- [x] User role field ("admin" | "user")
- [x] MOCK_USERS with role assignment
- [x] Admin: admin@example.com
- [x] Regular users: user@example.com, jane@example.com
- [x] Role display in UI

### 6. UI Enhancements
- [x] Account icon with avatar in header
- [x] Show avatar initials
- [x] Responsive navigation for authenticated users
- [x] Smooth auth state transitions

## 🛠️ Files Modified/Created

- ✅ `app/api/auth/login/route.ts` (NEW)
- ✅ `app/api/auth/signup/route.ts` (NEW)
- ✅ `app/api/auth/logout/route.ts` (NEW)
- ✅ `hooks/useAuth.ts` (ENHANCED)
- ✅ `app/(auth)/login/page.tsx` (ENHANCED)
- ✅ `app/(auth)/signup/page.tsx` (ENHANCED)
- ✅ `app/account/page.tsx` (NEW)
- ✅ `lib/session.ts` (NEW)
- ✅ `components/layout/Header.tsx` (UPDATED)
- ✅ `types/index.ts` (UPDATED with User role)
- ✅ `lib/mock-data.ts` (UPDATED with users)

## 🔑 Key Features

### Authentication Flow
1. User enters email/password
2. Form validates with Zod
3. POST to `/api/auth/login`
4. Server validates credentials
5. User stored in localStorage + cookie
6. isHydrated flag set to true
7. Redirect to protected page or home

### Session Management
- Token stored in httpOnly cookie (secure, not accessible to JavaScript)
- Session data stored in localStorage (for client-side access)
- Auto-restore on page refresh
- Manual logout clears both

### Role-Based Features
- Admin users can access `/dashboard`
- Regular users cannot access admin routes
- Role displayed in header & profile

## 📊 Demo Data

### Users
```typescript
{
  id: '1',
  email: 'admin@example.com',
  name: 'Admin User',
  role: 'admin',
  avatar: '/assets/avatar-admin.svg',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
},
{
  id: '2',
  email: 'user@example.com',
  name: 'John Doe',
  role: 'user',
  avatar: '/assets/avatar-user.svg',
  createdAt: '2024-01-02',
  updatedAt: '2024-01-02',
}
```

## 🧪 Testing

### Admin Login
- Email: `admin@example.com`
- Password: `123456`
- Expected: Redirect to `/dashboard`
- Role: "admin" badge in profile

### User Login
- Email: `user@example.com`
- Password: `123456`
- Expected: Redirect to `/account`
- Role: "user" badge in profile

### Protected Routes
- Try `/account` unauthenticated → Redirect to `/auth/login?redirect=/account`
- Try `/dashboard` as user → Redirect to `/`

## ✨ Next Steps (Sprint 3)
- Dashboard CRUD functionality
- Image upload with preview
- API endpoints for admin operations
