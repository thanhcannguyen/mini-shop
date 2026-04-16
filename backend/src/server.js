
import dotenv from "dotenv";                // dùng để đọc biến môi trường từ file .env
import app from "./app.js";                 // app Express đã cấu hình sẵn (middleware, routes...)
import connectDB from "./config/db.js";     // hàm kết nối MongoDB

// load biến môi trường (PORT, MONGO_URI...)
dotenv.config();

// lấy PORT từ .env, nếu không có thì dùng 3000
const PORT = process.env.PORT || 3000;

// hàm khởi động server
async function startServer() {
    try {
        // 1. kết nối database trước
        await connectDB();

        // 2. sau khi DB ok thì chạy server
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });

    } catch (error) {
        // nếu lỗi (DB hoặc server) thì log ra
        console.error("Không thể khởi động server:", error.message);
    }
}

// 3. gọi hàm để chạy server
startServer();