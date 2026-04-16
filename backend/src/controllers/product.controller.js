
import mongoose from "mongoose";
import Product from "../models/product.model.js"

// tạo sản phẩm
export const createProduct = async (req, res) => {
    try {
        // Bước 1 : Lấy dữ liệu 
        const { name, price, description, stock, category, image } = req.body
        // Bước 2 : Kiểm tra dữ liệu
        if (!name || price === null || !description || stock === null || !category || !image) {
            return res.status(400).json({
                message: "Vui lòng nhập đủ thông tin "
            })
        }
        // validate kiểu dữ liệu
        if (typeof price !== "number" || typeof stock !== "number") {
            return res.status(400).json({
                message: "price và stock phải là số"
            });
        }
        // Bước 3 : Kiểm tra price và stock 
        if (price < 0 || stock < 0) {
            return res.status(400).json({
                message: " price và stock không được nhỏ hơn 0 "
            })
        }
        // Bước 4  tạo product mới trong database
        const newProduct = await Product.create({
            name,
            price,
            description,
            stock,
            category,
            image
        })
        // Bước 5 Trả kết quả thành công
        return res.status(201).json({
            message: "Tạo sản phẩm thành công",
            product: newProduct
        })
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi Server",
            error: error.message
        })
    }
}


// lấy danh sách tất cả sản phẩm
export const getAllProducts = async (req, res) => {
    try {
        // Bước 1: Lấy toàn bộ sản phẩm từ DB
        const products = await Product.find()
        // Bước 2 : Trả kết quả thành công
        return res.status(200).json({
            message: "Lấy danh sách sản phẩm thành công",
            products: products
        })

    } catch (error) {
        return res.status(500).json({
            message: "Lỗi Server",
            error: error.message
        })
    }
}


// lấy chi tiết sản phẩm theo id
export const getProductById = async (req, res) => {
    try {
        // Bước 1. lấy id từ URL
        const { id } = req.params
        // check id hợp lệ
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID không hợp lệ"
            });
        }
        // Bước 2. tìm sản phẩm theo id
        const product = await Product.findById(id)
        // Bước 3. Nếu không tìm thấy product
        if (!product) {
            return res.status(404).json({
                message: "Sản phẩm không tồn tại"
            });
        }

        // Bước 4.Trả thông tin sản phẩm
        return res.status(200).json({
            message: "Lấy thông tin sản phẩm thành công",
            product: product
        });

    } catch (error) {
        return res.status(500).json({
            message: "Lỗi Server",
            error: error.message
        })
    }
}


// cập nhật sản phẩm
export const updateProduct = async (req, res) => {
    try {
        // Bước 1. lấy id từ URL
        const { id } = req.params
        // Bước 2.Kiểm tra id hợp lệ
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID không hợp lệ"
            });
        }
        // Bước 3. lấy dữ liệu mới từ body
        const { name, price, description, stock, category, image } = req.body
        // Bước 4. tìm sản phẩm theo id
        const product = await Product.findById(id)
        // Bước 5. nếu không có sản phẩm
        if (!product) {
            return res.status(404).json({
                message: "Sản phẩm không tồn tại"
            })
        }
        // Bước 6. xác thực dữ liệu nếu client có gửi lên
        if (price !== undefined && price < 0) {
            return res.status(400).json({
                message: " price không được nhỏ hơn 0"
            })
        }

        if (stock !== undefined && stock < 0) {
            return res.status(400).json({
                message: " stock không được nhỏ hơn 0"
            })
        }
        // Bước 7. cập nhật dữ liệu
        product.name = name || product.name
        product.description = description || product.description
        product.category = category || product.category
        product.image = image || product.image
        product.price = price !== undefined ? price : product.price
        product.stock = stock !== undefined ? stock : product.stock

        // Bước 8. lưu dữ liệu
        await product.save()
        // Bước 9. trả kết quả
        return res.status(200).json({
            message: "cập nhật sản phẩm thành công"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Lỗi Server",
            error: error.message
        })
    }
}


// xóa sản phẩm
export const deleteProduct = async (req, res) => {
    try {
        // Bước 1. lấy id từ URL
        const { id } = req.params
        // Bước 2.Kiểm tra id hợp lệ
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID không hợp lệ"
            });
        }
        // Bước 3. tìm sản phẩm theo id
        const product = await Product.findById(id)
        // Bước 4. nếu không có sản phẩm
        if (!product) {
            return res.status(404).json({
                message: "Sản phẩm không tồn tại"
            })
        }
        // Bước 5. xóa product
        await product.deleteOne()
        // Bước 6. trả kết quả
        return res.status(200).json({
            message: "Xóa sản phẩm thành công"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Lỗi Server",
            error: error.message
        })
    }
}