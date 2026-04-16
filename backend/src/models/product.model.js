
import mongoose, { Schema } from "mongoose";

// Bước 1: tạo schema : bản thiết kế product
const productSchema = new Schema({
    // Bước 2: định nghĩa từng trường thông tin
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    }
},
    // Bước 3: Thêm timestamps để ghi lại thời gian tạo và cập nhật bản ghi
    {
        timestamps: true
    }
)
// Bước 4: Tạo model
const Product = mongoose.model("Product", productSchema)

// Bước 5: export để controller dùng
export default Product