
import express from "express"

import {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrder,
    deleteOrder
} from "../controllers/order.controller.js"

// authMiddleware dùng để kiểm tra token (đăng nhập) trước khi cho phép truy cập API
import { authMiddleware } from "../middlewares/auth.middleware.js";

// Router: nhận request (URL + method) và chuyển cho controller xử lý
const router = express.Router();

// POST /oders -> Tạo đơn hàng
router.post("/", authMiddleware, createOrder);

// GET /my-order -> lấy danh sách đơn hàng của user đang đăng nhập
router.get("/my-orders", authMiddleware, getMyOrders)

// GET/:id -> lấy chi tiết đơn hàng 
router.get("/:id", authMiddleware, getOrderById)

// PUT/:id/status -> cập nhật trạng thái đơn hàng
router.put("/:id/status", authMiddleware, updateOrder)

// DELETE/:id -> xóa đơn hàng theo id
router.delete("/:id", authMiddleware, deleteOrder);

export default router;