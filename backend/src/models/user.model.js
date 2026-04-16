

// Chức năng đăng ký của user ( ta cần lưu dữ liệu user vào database)
// model có vai trò là Định nghĩa: “user trông như thế nào trong database”
// câu hỏi ngược 1 : user có những thông tin gì 
// câu hỏi ngược 2 : mỗi thông tin có kiểu dữ liệu gì
// câu hỏi ngược 3 : mỗi thông tin có những ràng buộc gì không


import mongoose from "mongoose";
// Bước 1: tạo schema : bản thiết kế user

const userSchema = new mongoose.Schema({
    // Bước 2: định nghĩa từng trường thông tin
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},
    // Bước 3: Thêm timestamps để ghi lại thời gian tạo và cập nhật bản ghi
    {
        timestamps: true
    }
)

// Bước 4: Tạo model
const User = mongoose.model("User", userSchema)

// Bước 5: export để controller dùng
export default User 
