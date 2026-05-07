export const APP_NAME = 'Sports Shop';
export const APP_DESCRIPTION = 'Cửa hàng bán đồ thể thao trực tuyến';

// Navigation
export const NAV_ITEMS = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Cửa hàng', href: '/shop' },
  { label: 'Giỏ hàng', href: '/cart' },
  { label: 'Tài khoản', href: '/account' },
];

// Product Categories
export const PRODUCT_CATEGORIES = [
  { id: 'shoes', name: 'Giày' },
  { id: 'apparel', name: 'Quần áo' },
  { id: 'accessories', name: 'Phụ kiện' },
  { id: 'equipment', name: 'Thiết bị' },
];

// Sort options
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'price-low', label: 'Giá: Thấp đến Cao' },
  { value: 'price-high', label: 'Giá: Cao đến Thấp' },
  { value: 'popular', label: 'Phổ biến nhất' },
  { value: 'rating', label: 'Đánh giá cao' },
];

// Pagination
export const DEFAULT_PAGE_SIZE = 4;
export const PAGINATION_OPTIONS = [4, 8, 12];

// API endpoints
export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  AUTH_LOGIN: '/api/auth/login',
  AUTH_SIGNUP: '/api/auth/signup',
  AUTH_LOGOUT: '/api/auth/logout',
  AUTH_REFRESH: '/api/auth/refresh',
  AUTH_ME: '/api/auth/me',
  PRODUCTS: '/api/products',
  ORDERS: '/api/orders',
  USERS: '/api/users',
  UPLOAD: '/api/upload',
};

// Error messages
export const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Email không hợp lệ',
  PASSWORD_TOO_SHORT: 'Mật khẩu phải có ít nhất 6 ký tự',
  PASSWORDS_NOT_MATCH: 'Mật khẩu không khớp',
  EMAIL_ALREADY_USED: 'Email này đã được sử dụng',
  INVALID_CREDENTIALS: 'Email hoặc mật khẩu không chính xác',
  UNAUTHORIZED: 'Bạn không có quyền truy cập',
  NOT_FOUND: 'Không tìm thấy',
  SERVER_ERROR: 'Lỗi máy chủ, vui lòng thử lại',
  NETWORK_ERROR: 'Lỗi kết nối, vui lòng kiểm tra internet',
};

// Success messages
export const SUCCESS_MESSAGES = {
  SIGNUP_SUCCESS: 'Đăng ký thành công',
  LOGIN_SUCCESS: 'Đăng nhập thành công',
  LOGOUT_SUCCESS: 'Đăng xuất thành công',
  PROFILE_UPDATED: 'Cập nhật thông tin thành công',
  PRODUCT_ADDED: 'Thêm sản phẩm thành công',
  ORDER_CREATED: 'Đơn hàng được tạo thành công',
};
