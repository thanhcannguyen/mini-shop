
import express from "express";
import {
    registerUser,
    loginUser,
    getUserById,
    getAllUser,
    updateUser,
    deleteUser,
    getMyProfile,
    changePassword
} from "../controllers/user.controller.js";

// authMiddleware dùng để kiểm tra token (đăng nhập) trước khi cho phép truy cập API
import { authMiddleware } from "../middlewares/auth.middleware.js";

// Router: nhận request (URL + method) và chuyển cho controller xử lý
const router = express.Router();

// POST /register → đăng ký user
router.post("/register", registerUser);

// POST /login → đăng nhập
router.post("/login", loginUser);

// GET /me -> lấy thông tin profile của mình
router.get("/me", authMiddleware, getMyProfile);

// GET /user -> lấy danh sách user
router.get("/", authMiddleware, getAllUser);

// GET /:id → lấy thông tin user theo id
router.get("/:id", authMiddleware, getUserById);

// PUT /users/change-password -> Đổi mật khẩu 
router.put("/change-password", authMiddleware, changePassword);

// PUT /:id -> cập nhật user
router.put("/:id", authMiddleware, updateUser)

// DELETE /:id -> xóa user
router.delete("/:id", authMiddleware, deleteUser)


export default router;