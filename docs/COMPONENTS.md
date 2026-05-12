# Component Documentation

## Common Components

### Button Component
**File**: `components/common/Button.tsx`

```typescript
interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}
```

**Usage**:
```jsx
import { Button } from '@/components/common';

// Primary button
<Button>Click me</Button>

// Large outline button
<Button variant="outline" size="lg">Sign up</Button>

// Full width disabled button
<Button fullWidth disabled>Loading...</Button>
```

### Input Component
**File**: `components/common/Input.tsx`

```typescript
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}
```

**Usage**:
```jsx
import { Input } from '@/components/common';

<Input
  label="Email"
  type="email"
  placeholder="your@email.com"
  error={errors.email?.message}
  {...register('email')}
/>
```

### Skeleton Component
**File**: `components/common/Skeleton.tsx`

**Components**:
- `Skeleton` - Generic loading skeleton
- `ProductSkeleton` - Product card placeholder
- `CardSkeleton` - Generic card placeholder

**Usage**:
```jsx
import { ProductSkeleton } from '@/components/common';

// Show while loading
isLoading && <ProductSkeleton />

// Or with custom dimensions
<Skeleton className="h-48 w-full" />
```

---

## Layout Components

### Header Component
**File**: `components/layout/Header.tsx`

Displays:
- App logo/name
- Navigation links
- Auth status (login/signup or user menu + logout)

**Features**:
- Responsive design
- Dynamic links based on auth state
- Mobile-friendly (Future Sprint)

**Usage**:
```jsx
import { Header } from '@/components/layout';

<Header />
```

### Footer Component
**File**: `components/layout/Footer.tsx`

Displays:
- About section
- Links (Shop, Support)
- Social media links
- Copyright

**Features**:
- 4-column grid layout
- Responsive design

**Usage**:
```jsx
import { Footer } from '@/components/layout';

<Footer />
```

### RootLayout Component
**File**: `components/layout/RootLayout.tsx`

Wrapper component that combines Header, main content, and Footer.

---

## Product Components

### ProductCard Component
**File**: `components/product/ProductCard.tsx`

```typescript
interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}
```

Displays:
- Product image (with hover effect)
- Name and description
- Price in millions VND
- Star rating
- Review count
- "Add to cart" button
- "View details" link

**Usage**:
```jsx
import { ProductCard } from '@/components/product';

<ProductCard
  product={product}
  onAddToCart={() => addItem(product, 1)}
/>
```

**Features**:
- Image optimization
- Error fallback to placeholder
- Hover effects
- Links to product details page

---

## Custom Hooks

### useAuth Hook
**File**: `hooks/useAuth.ts`

Manages authentication state and operations.

**Returns**:
```typescript
{
  user: User | null;              // Current user
  token: string | null;           // Auth token
  isLoading: boolean;             // Request loading state
  isAuthenticated: boolean;       // Auth status
  login(email, password);         // Login function
  logout();                       // Logout function
  signup(email, password, name);  // Signup function
}
```

**Usage**:
```jsx
const { user, login, logout } = useAuth();

// In login page
const result = await login(email, password);
if (result.success) {
  router.push('/');
}

// In header
{isAuthenticated ? (
  <>
    <span>{user?.name}</span>
    <button onClick={logout}>Logout</button>
  </>
) : (
  <Link href="/auth/login">Login</Link>
)}
```

### useDebounce Hook
**File**: `hooks/useDebounce.ts`

Debounces a value to avoid excessive updates (useful for search).

```typescript
function useDebounce<T>(value: T, delay: number): T
```

**Usage**:
```jsx
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 300);

// Use debouncedSearch in effects/queries
useEffect(() => {
  // This runs only 300ms after user stops typing
  performSearch(debouncedSearch);
}, [debouncedSearch]);
```

### useFetch Hook
**File**: `hooks/useFetch.ts`

Fetches data from an API endpoint.

```typescript
interface UseFetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  skip?: boolean;
}

function useFetch<T>(url: string, options?: UseFetchOptions): {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}
```

**Usage**:
```jsx
const { data, loading, error } = useFetch('/api/products');

if (loading) return <Skeleton />;
if (error) return <div>Error: {error}</div>;
return <ProductGrid products={data} />;
```

---

## Zustand Stores

### cartStore
**File**: `store/cartStore.ts`

Manages shopping cart state.

```typescript
interface CartStore {
  items: CartItem[];
  total: number;
  addItem(product, quantity);
  removeItem(productId);
  updateQuantity(productId, quantity);
  clearCart();
}
```

**Usage**:
```jsx
import { useCartStore } from '@/store/cartStore';

const { items, total, addItem } = useCartStore();

<button onClick={() => addItem(product, 1)}>
  Add to cart
</button>
```

### uiStore
**File**: `store/uiStore.ts`

Manages UI state (toasts, modals, etc.).

```typescript
interface UIStore {
  toasts: Toast[];
  addToast(message, type, duration);
  removeToast(id);
  clearToasts();
}
```

**Usage**:
```jsx
import { useUIStore } from '@/store/uiStore';

const addToast = useUIStore((state) => state.addToast);

addToast({
  message: 'Product added to cart!',
  type: 'success',
  duration: 2000,
});
```

---

## Component Composition Example

### Shop Page
```jsx
import { ProductCard } from '@/components/product';
import { Input, Button } from '@/components/common';
import { useDebounce } from '@/hooks';
import { useCartStore } from '@/store/cartStore';

export function ShopPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  const addItem = useCartStore((state) => state.addItem);

  const filteredProducts = useMemo(
    () => filterProducts(MOCK_PRODUCTS, debouncedSearch),
    [debouncedSearch]
  );

  return (
    <div>
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
      />

      <div className="grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => addItem(product, 1)}
          />
        ))}
      </div>
    </div>
  );
}
```

---

## Best Practices

### Component Design
1. ✅ Keep components small and focused
2. ✅ Use TypeScript interfaces for props
3. ✅ Export with barrel files (index.ts)
4. ✅ Use 'use client' directive where needed
5. ✅ Memoize expensive components

### Styling
1. ✅ Use Tailwind CSS classes
2. ✅ Maintain consistent spacing (4px units)
3. ✅ Use design system colors
4. ✅ Mobile-first responsive design

### Performance
1. ✅ Use React.memo for list items
2. ✅ Use useCallback for handlers
3. ✅ Use useMemo for expensive computations
4. ✅ Lazy load images with Next/Image

---

**Last Updated**: Mai 2024  
**Version**: 1.0
