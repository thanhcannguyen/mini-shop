# 🛒 Mini Shop

Một ứng dụng quản lý cửa hàng mini (Full-stack) được xây dựng với **React + Vite** (frontend) và **Node.js + Express + MongoDB** (backend).

---

## 📋 Mục lục

- [Tính năng](#-tính-năng)
- [Tech Stack](#-tech-stack)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
- [Cài đặt & Chạy local](#-cài-đặt--chạy-local)
- [Biến môi trường](#-biến-môi-trường)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)

---

## ✨ Tính năng

- 🔐 Xác thực người dùng (Đăng ký / Đăng nhập) với JWT
- 👥 Quản lý người dùng (Users)
- 📦 Quản lý sản phẩm (Products) — thêm, sửa, xóa
- 🧾 Quản lý đơn hàng (Orders) với các trạng thái: `pending` → `confirmed` → `shipping` → `completed` / `cancelled`
- 📊 Dashboard tổng quan
- 🛡️ Bảo vệ route bằng Auth Middleware

---

## 🛠 Tech Stack

### Frontend
| Công nghệ | Phiên bản |
|---|---|
| React | ^19 |
| Vite | ^8 |
| React Router DOM | ^7 |
| Axios | ^1.15 |

### Backend
| Công nghệ | Phiên bản |
|---|---|
| Node.js | >= 18 |
| Express | ^5 |
| MongoDB + Mongoose | ^9 |
| JSON Web Token | ^9 |
| bcryptjs | ^3 |
| dotenv | ^17 |
| morgan | ^1.10 |

---

## 📁 Cấu trúc dự án

```
mini-shop/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js               # Kết nối MongoDB
│   │   ├── controllers/
│   │   │   ├── user.controller.js  # Xử lý logic User
│   │   │   ├── product.controller.js
│   │   │   └── order.controller.js
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js  # Xác thực JWT
│   │   ├── models/
│   │   │   ├── user.model.js       # Schema User
│   │   │   ├── product.model.js    # Schema Product
│   │   │   └── order.model.js      # Schema Order
│   │   ├── routes/
│   │   │   ├── user.routes.js
│   │   │   ├── product.routes.js
│   │   │   └── order.routes.js
│   │   ├── app.js                  # Cấu hình Express app
│   │   └── server.js               # Khởi động server
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ApiCard.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx     # Quản lý state đăng nhập
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Users.jsx
    │   │   ├── Products.jsx
    │   │   └── Orders.jsx
    │   ├── services/
    │   │   └── api.js              # Cấu hình Axios + token
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

---

## ⚙️ Yêu cầu hệ thống

- [Node.js](https://nodejs.org/) >= 18
- [MongoDB](https://www.mongodb.com/) (local hoặc MongoDB Atlas)
- npm hoặc yarn

---

## 🚀 Cài đặt & Chạy local

### 1. Clone repository

```bash
git clone https://github.com/<your-username>/mini-shop.git
cd mini-shop
```

### 2. Cài đặt & chạy Backend

```bash
cd backend
npm install
```

Tạo file `.env` trong thư mục `backend/`:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/mini-shop
JWT_SECRET=your_super_secret_key
```

Chạy server:

```bash
# Development (tự reload khi code thay đổi)
npm run dev

# Production
npm start
```

Server chạy tại: `http://localhost:3000`

### 3. Cài đặt & chạy Frontend

Mở terminal mới:

```bash
cd frontend
npm install
```

Tạo file `.env` trong thư mục `frontend/`:

```env
VITE_API_URL=http://localhost:3000
```

Chạy app:

```bash
npm run dev
```

App chạy tại: `http://localhost:5173`

---

## 🔑 Biến môi trường

### Backend (`backend/.env`)

| Biến | Mô tả | Ví dụ |
|---|---|---|
| `PORT` | Cổng server chạy | `3000` |
| `MONGODB_URI` | Chuỗi kết nối MongoDB | `mongodb://localhost:27017/mini-shop` |
| `JWT_SECRET` | Khóa bí mật ký JWT | `mysecretkey123` |

### Frontend (`frontend/.env`)

| Biến | Mô tả | Ví dụ |
|---|---|---|
| `VITE_API_URL` | URL của backend API | `http://localhost:3000` |

> ⚠️ **Lưu ý:** Không commit file `.env` lên Git. Đảm bảo `.env` đã có trong `.gitignore`.

---

## 📡 API Endpoints

### Users
| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| POST | `/users/register` | Đăng ký tài khoản | ❌ |
| POST | `/users/login` | Đăng nhập | ❌ |
| GET | `/users` | Lấy danh sách users | ✅ |
| GET | `/users/:id` | Lấy thông tin user | ✅ |
| PUT | `/users/:id` | Cập nhật user | ✅ |
| DELETE | `/users/:id` | Xóa user | ✅ |

### Products
| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| GET | `/products` | Lấy danh sách sản phẩm | ❌ |
| GET | `/products/:id` | Lấy chi tiết sản phẩm | ❌ |
| POST | `/products` | Tạo sản phẩm mới | ✅ |
| PUT | `/products/:id` | Cập nhật sản phẩm | ✅ |
| DELETE | `/products/:id` | Xóa sản phẩm | ✅ |

### Orders
| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| GET | `/orders` | Lấy danh sách đơn hàng | ✅ |
| GET | `/orders/:id` | Lấy chi tiết đơn hàng | ✅ |
| POST | `/orders` | Tạo đơn hàng mới | ✅ |
| PUT | `/orders/:id` | Cập nhật trạng thái đơn | ✅ |
| DELETE | `/orders/:id` | Xóa đơn hàng | ✅ |

> ✅ Auth = Cần gửi kèm `Authorization: Bearer <token>` trong header.

---

## ☁️ Deployment

Xem hướng dẫn deploy chi tiết trong phần bên dưới (hoặc file `DEPLOYMENT.md` nếu có).

Gợi ý nền tảng:
- **Backend:** [Render](https://render.com) · [Railway](https://railway.app) · [Fly.io](https://fly.io)
- **Frontend:** [Vercel](https://vercel.com) · [Netlify](https://netlify.com)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier)

---

## 📄 License

MIT
