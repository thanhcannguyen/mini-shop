
import mongoose from "mongoose";

// Bước 1: tạo schema : bản thiết kế order
const orderSchema = new mongoose.Schema({
    // Bước 2: định nghĩa từng trường thông tin
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true,
            min: 0
        }
    }],
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    shippingAddress: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "shipping", "completed", "cancelled"],
        default: "pending"
    },
    note: {
        type: String,
        trim: true,
        default: ""
    }
},
    // Bước 3: Thêm timestamps để ghi lại thời gian tạo và cập nhật bản ghi
    {
        timestamps: true
    }
)

// Bước 4: Tạo model
const Order = mongoose.model("Order", orderSchema)

// Bước 5: export để controller dùng
export default Order