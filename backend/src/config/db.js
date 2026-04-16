// import thư viện mongoose để làm việc với MongoDB
import mongoose from "mongoose";

// tạo hàm kết nối database
async function connectDB() {
    try {
        // dùng mongoose để kết nối tới MongoDB
        // process.env.MONGODB_URI là biến môi trường chứa link kết nối DB
        await mongoose.connect(process.env.MONGODB_URI);

        // nếu kết nối thành công thì in ra thông báo
        console.log("Connected to MongoDB");
    } catch (error) {
        // nếu có lỗi khi kết nối thì in ra lỗi
        console.error("MongoDB connection error:", error.message);

        // dừng chương trình ngay lập tức (exit với mã lỗi 1)
        process.exit(1);
    }
}

// export hàm để dùng ở file khác (ví dụ: server.js)
export default connectDB;