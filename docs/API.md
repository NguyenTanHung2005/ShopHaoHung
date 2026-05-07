# API Documentation

## Overview

Sports Shop API provides endpoints for products, orders, users, and authentication.

**Base URL**: `http://localhost:3000/api`

**Status**: Sprint 1 uses mock data. Real API will be implemented in Sprint 2+.

---

## Endpoints

### Products

#### Get All Products
```
GET /api/products
```

**Query Parameters**:
- `search` (string) - Search by name or description
- `category` (string) - Filter by category (shoes, apparel, accessories, equipment)
- `sort` (string) - Sort option (newest, price-low, price-high, popular, rating)
- `page` (number) - Page number (default: 1)
- `limit` (number) - Items per page (default: 12)

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Giày Nike Air Max",
      "description": "Giày thể thao cao cấp...",
      "price": 3500000,
      "category": "shoes",
      "image": "/assets/product-1.jpg",
      "stock": 50,
      "rating": 4.5,
      "reviews": 128,
      "createdAt": "2024-01-01",
      "updatedAt": "2024-01-01"
    }
  ],
  "total": 8,
  "page": 1,
  "limit": 12
}
```

#### Get Single Product
```
GET /api/products/:id
```

**Response**:
```json
{
  "success": true,
  "data": { ...product details... }
}
```

---

### Authentication

#### Login
```
POST /api/auth/login
```

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response** (Success):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "1",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Response** (Error):
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

#### Signup
```
POST /api/auth/signup
```

**Request Body**:
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "New User"
}
```

**Response** (Success):
```json
{
  "success": true,
  "data": {
    "user": { ...user details... },
    "token": "..."
  }
}
```

#### Logout
```
POST /api/auth/logout
```

**Response**:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### Orders

#### Get All Orders
```
GET /api/orders
```

**Headers**:
```
Authorization: Bearer <token>
```

**Query Parameters**:
- `status` (string) - Filter by status (pending, processing, shipped, delivered, cancelled)
- `page` (number) - Page number
- `limit` (number) - Items per page

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "ORD-001",
      "userId": "1",
      "items": [
        {
          "productId": "1",
          "quantity": 2,
          "price": 3500000
        }
      ],
      "totalPrice": 7000000,
      "status": "delivered",
      "createdAt": "2024-01-15",
      "updatedAt": "2024-01-20"
    }
  ],
  "total": 2,
  "page": 1
}
```

#### Create Order
```
POST /api/orders
```

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "items": [
    {
      "productId": "1",
      "quantity": 2
    }
  ],
  "shippingAddress": "123 Main St, City"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "ORD-003",
    "userId": "1",
    "items": [...],
    "totalPrice": 7000000,
    "status": "pending",
    "createdAt": "2024-05-07"
  }
}
```

---

### Users

#### Get User Profile
```
GET /api/users/:id
```

**Headers**:
```
Authorization: Bearer <token>
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "1",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "avatar": "/assets/avatar-1.jpg",
    "createdAt": "2024-01-01",
    "updatedAt": "2024-01-01"
  }
}
```

#### Update User Profile
```
PUT /api/users/:id
```

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "New Name",
  "avatar": "/path/to/avatar.jpg"
}
```

**Response**:
```json
{
  "success": true,
  "data": { ...updated user... }
}
```

---

### Upload

#### Upload Image
```
POST /api/upload
```

**Headers**:
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body**:
```
FormData:
  file: <image file>
  type: "avatar" | "product"
```

**Response**:
```json
{
  "success": true,
  "data": {
    "url": "/uploads/image-1234.jpg",
    "size": 102400,
    "mimeType": "image/jpeg"
  }
}
```

---

## Error Codes

| Code | Message | Status |
|------|---------|--------|
| INVALID_EMAIL | Email không hợp lệ | 400 |
| PASSWORD_TOO_SHORT | Mật khẩu phải có ít nhất 6 ký tự | 400 |
| EMAIL_ALREADY_USED | Email này đã được sử dụng | 409 |
| INVALID_CREDENTIALS | Email hoặc mật khẩu không chính xác | 401 |
| UNAUTHORIZED | Bạn không có quyền truy cập | 403 |
| NOT_FOUND | Không tìm thấy | 404 |
| SERVER_ERROR | Lỗi máy chủ | 500 |

---

## Response Format

All API responses follow this format:

```json
{
  "success": true|false,
  "data": {...},
  "error": "error message",
  "message": "success message"
}
```

---

## Authentication

### Token-Based Authentication
- JWT tokens are used for authentication
- Include token in Authorization header: `Authorization: Bearer <token>`
- Tokens expire after 24 hours
- Use refresh token to get new access token

### Demo Credentials
```
Email: demo@example.com
Password: 123456
```

---

## Rate Limiting

- No rate limiting in development
- Production will implement rate limiting (Sprint 6)

---

## Pagination

Default pagination parameters:
- `page`: 1
- `limit`: 12

Maximum limit: 100

---

## Mock Data

During Sprint 1, the API returns mock data from `/lib/mock-data.ts`:

- **Products**: 8 items
- **Users**: 3 items
- **Orders**: 2 items

Real API integration will be implemented in Sprint 2.

---

**Last Updated**: Mai 2024  
**API Version**: 1.0 (Mock)  
**Next Update**: Sprint 2
