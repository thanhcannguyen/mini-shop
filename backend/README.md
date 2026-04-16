# 🛒 Mini Shop Backend API

## 📌 Giới thiệu

Đây là dự án **Backend API cho hệ thống Mini Shop** được xây dựng bằng **Node.js, Express và MongoDB**.

Dự án cung cấp các chức năng cơ bản của một hệ thống thương mại điện tử như:

* Quản lý người dùng (User)
* Quản lý sản phẩm (Product)
* Quản lý đơn hàng (Order)
* Xác thực người dùng bằng JWT

---

## 🚀 Công nghệ sử dụng

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcryptjs
* dotenv
* morgan

---

## 📂 Cấu trúc thư mục

```
src/
│── config/          # Kết nối database
│── controllers/     # Xử lý logic
│── models/          # Định nghĩa schema
│── routes/          # Định nghĩa API
│── middlewares/     # Auth middleware
│── app.js           # Cấu hình app
│── server.js        # Khởi động server
```

---

## ⚙️ Cài đặt dự án

### 1. Clone project

```bash
git clone https://github.com/thanhcannguyen/mini-shop-backend.git
cd mini-shop-backend
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Tạo file `.env`

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Chạy server

```bash
npm run dev
```

Server sẽ chạy tại:

```
http://localhost:3000
```

---

## 🔐 Xác thực (Authentication)

Dự án sử dụng JWT:

* Sau khi login → nhận token
* Gửi token qua header:

```
Authorization: Bearer <token>
```

---

## 🧠 Luồng hoạt động chính

### 🔐 1. Đăng nhập (Authentication Flow)

1. User gửi email + password
2. Backend kiểm tra thông tin
3. Nếu hợp lệ → tạo JWT token
4. Trả token về client
5. Client dùng token để gọi các API khác

---

### 🛒 2. Tạo đơn hàng (Order Flow)

1. User đăng nhập → nhận token
2. Gửi request tạo đơn hàng
3. Backend:

   * Lấy thông tin sản phẩm từ database
   * Tính tổng tiền
   * Lưu đơn hàng vào DB
4. Trả về order

---

### 📦 3. Quản lý sản phẩm (Product Flow)

1. Admin tạo sản phẩm
2. Lưu vào database
3. Client gọi API để:

   * Lấy danh sách sản phẩm
   * Xem chi tiết sản phẩm

---

## 📌 API Endpoints

---

### 👤 USER

| Method | Endpoint               | Mô tả                      |
| ------ | ---------------------- | -------------------------- |
| POST   | /users/register        | Đăng ký                    |
| POST   | /users/login           | Đăng nhập                  |
| GET    | /users/me              | Lấy thông tin profile      |
| GET    | /users                 | Lấy danh sách user         |
| GET    | /users/:id             | Lấy thông tin user theo id |
| PUT    | /users/change-password | Đổi mật khẩu               |
| PUT    | /users/:id             | Cập nhật user              |
| DELETE | /users/:id             | Xóa user                   |

---

### 📦 PRODUCT

| Method | Endpoint      | Mô tả                  |
| ------ | ------------- | ---------------------- |
| POST   | /products     | Tạo sản phẩm           |
| GET    | /products     | Lấy danh sách sản phẩm |
| GET    | /products/:id | Lấy chi tiết sản phẩm  |
| PUT    | /products/:id | Cập nhật sản phẩm      |
| DELETE | /products/:id | Xóa sản phẩm           |

---

### 🧾 ORDER

| Method | Endpoint           | Mô tả                   |
| ------ | ------------------ | ----------------------- |
| POST   | /orders            | Tạo đơn hàng            |
| GET    | /orders/my-orders  | Lấy đơn hàng của user   |
| GET    | /orders/:id        | Lấy chi tiết đơn hàng   |
| PUT    | /orders/:id/status | Cập nhật trạng thái đơn |
| DELETE | /orders/:id        | Xóa đơn hàng            |

---

## 🧪 Test API

Bạn có thể test bằng:

* Postman
* Thunder Client

---

## 📈 Hướng phát triển thêm

* Giảm stock khi tạo order
* Role (admin / user)
* Phân quyền API
* Pagination sản phẩm
* Upload hình ảnh
* Payment (Stripe, PayPal)

---

## 📌 Ghi chú

* Password được hash bằng bcrypt
* Không trả password trong response
* API được thiết kế theo RESTful

---

## 👨‍💻 Tác giả

* Name: Nguyễn Thành Can
* GitHub: https://github.com/thanhcannguyen

---

## ⭐ Kết luận

Dự án này là nền tảng backend cơ bản cho hệ thống e-commerce, phù hợp để:

* Học backend Node.js
* Hiểu CRUD + Authentication
* Làm nền tảng cho các project nâng cao

---
