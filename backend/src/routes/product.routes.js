
import express from "express"

import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from "../controllers/product.controller.js"

// Router: nhận request (URL + method) và chuyển cho controller xử lý
const router = express.Router();

// POST /products -> Tạo sản phẩm
router.post("/", createProduct);

// GET /products -> lấy danh sách sản phẩm
router.get("/", getAllProducts);

// GET /:id -> lấy thông tin product theo id
router.get("/:id", getProductById)

// PUT /:id -> cập nhật sản phẩm theo id
router.put("/:id", updateProduct);

// DELETE /:id -> xóa sản phẩm theo id
router.delete("/:id", deleteProduct)

export default router;