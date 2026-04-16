
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import mongoose from "mongoose";


// tạo đơn hàng
export const createOrder = async (req, res) => {
    try {
        // Bước 1: Lấy user từ token
        const userId = req.user.userId
        // Bước 2: lấy dữ liệu từ body
        const { items, shippingAddress, phoneNumber, note } = req.body
        // Bước 3: xác thực , kiểm tra 
        if (!items || items.length === 0) {
            return res.status(400).json({
                message: "Đơn hàng không tồn tại"
            })
        }
        // Bước 4 xử lý từng product
        let totalPrice = 0
        const orderItems = []
        for (const item of items) {
            const product = await Product.findById(item.product)
            if (!product) {
                return res.status(404).json({
                    message: "Sản phẩm không tồn tại"
                })
            }

            const itemPrice = product.price * item.quantity
            totalPrice += itemPrice
            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            })
        }
        // Bước 5 tạo order
        const newOrder = await Order.create({
            user: userId,
            items: orderItems,
            totalPrice,
            shippingAddress,
            phoneNumber,
            note
        })

        // Bước 6. trả kết quả
        return res.status(201).json({
            message: "Tạo đơn hàng thành công"
        })


    } catch (error) {
        return res.status(500).json({
            message: "Lỗi Server",
            error: error.message
        })
    }
}


// Lấy danh sách đơn hàng của user đang đăng nhập
export const getMyOrders = async (req, res) => {
    try {
        // Bước 1. lấy userId từ token
        const userId = req.user.userId
        // Bước 2. query Order theo userId
        const orders = await Order.find({ user: userId }).populate("items.product")
        // Bước 3. trả danh sách order
        return res.status(200).json({
            message: "Lấy danh sách đơn hàng thành công",
            orders: orders
        })


    } catch (error) {
        return res.status(500).json({
            message: "Lỗi Server",
            error: error.message
        })
    }
}


// Lấy chi tiết đơn hàng theo id
export const getOrderById = async (req, res) => {
    try {
        // Bước 1. lấy userId từ token
        const userId = req.user.userId
        // Bước 2. lấy orderId từ params
        const orderId = req.params.id
        //
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({
                message: "ID đơn hàng không hợp lệ"
            });
        }
        // Bước 3. query DB
        const order = await Order.findOne({ _id: orderId, user: userId }).populate("items.product")
        // Bước 4 Nếu không tìm thấy
        if (!order) {
            return res.status(404).json({
                message: "Không tìm thấy đơn hàng"
            });
        }
        // Bước 5. trả chi tiết đơn hàng 
        return res.status(200).json({
            message: "Lấy chi tiết đơn hàng thành công",
            order: order
        })
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi Server",
            error: error.message
        })
    }
}


// Cập nhật trạng thái đơn hàng
export const updateOrder = async (req, res) => {
    try {
        // Bước 1 lấy id từ params
        const { id } = req.params
        // Bước 2 lấy status từ body
        const { status } = req.body
        // Bước 3 kiểm tra thiếu status
        if (!status) {
            return res.status(400).json({
                message: "Vui long cung cấp trạng thái"
            })
        }

        // Bước 4: kiểm tra id hợp lệ
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID đơn hàng không hợp lệ"
            });
        }

        // Bước 5: kiểm tra status hợp lệ
        const validStatus = ["pending", "confirmed", "shipping", "completed", "cancelled"];

        if (!validStatus.includes(status)) {
            return res.status(400).json({
                message: "Trạng thái không hợp lệ"
            });
        }

        // Bước 6: tìm order
        const order = await Order.findById(id);

        // Bước 7: nếu không tìm thấy
        if (!order) {
            return res.status(404).json({
                message: "Không tìm thấy đơn hàng"
            });
        }

        // Bước 8: cập nhật status
        order.status = status;

        // Bước 9: lưu vào DB
        await order.save();

        // Bước 10: trả kết quả
        return res.status(200).json({
            message: "Cập nhật trạng thái đơn hàng thành công",
            order
        });


    } catch (error) {
        return res.status(500).json({
            message: "Lỗi Server",
            error: error.message
        })
    }
}


// Xóa đơn hàng
export const deleteOrder = async (req, res) => {
    try {
        // Bước 1: lấy id từ params
        const { id } = req.params;

        // Bước 2: kiểm tra id hợp lệ
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID đơn hàng không hợp lệ"
            });
        }

        // Bước 3: tìm order theo id
        const order = await Order.findById(id);

        // Bước 4: nếu không tìm thấy
        if (!order) {
            return res.status(404).json({
                message: "Không tìm thấy đơn hàng"
            });
        }

        // Bước 5: xóa order
        await order.deleteOne();

        // Bước 6: trả kết quả thành công
        return res.status(200).json({
            message: "Xóa đơn hàng thành công"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Lỗi Server",
            error: error.message
        });
    }
};