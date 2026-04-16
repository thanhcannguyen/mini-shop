
import User from "../models/user.model.js";
import bcrypt, { hash } from "bcryptjs";  // thư viện mã hóa password
import jwt from "jsonwebtoken"  // thư viện tạo token khi login

// Controller có vai trò: xử lý logic (nhận dữ liệu → kiểm tra → lưu DB → trả kết quả)

// Đăng ký user: nhận dữ liệu -> kiểm tra -> lưu DB -> trả kết quả
export const registerUser = async (req, res) => {
    try {
        // Bước 1 Lấy dữ liệu từ client gửi lên
        const { name, email, password } = req.body

        // Bước 2 Kiểm tra kiểu dữ liệu
        // Nếu thiếu → trả lỗi ngay
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Vui lòng nhập đầy đủ name, email, password"
            })
        }

        // Bước 3 Kiểm tra email đã tồn tại hay chưa
        const existingUser = await User.findOne({ email })
        // nếu email đã tồn tại thì không cho đăng ký
        if (existingUser) {
            return res.status(400).json({
                message: "Email đã tồn tại"
            })
        }

        // Hash password trước khi lưu vào DB
        const hashedPassword = await bcrypt.hash(password, 10)

        // Bước 4  tạo user mới trong database
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        // Bước 5 Trả kết quả thành công
        return res.status(201).json({
            message: "Đăng ký thành công",
            user: newUser
        })

    } catch (error) {
        // Bước 6 Nếu có lỗi server -> trả lỗi
        return res.status(500).json({
            message: "Lỗi Server",
            error: error.message
        })

    }
}


// Đăng nhập user
export const loginUser = async (req, res) => {
    try {
        // Bước 1. Lấy dữ liệu từ client
        const { email, password } = req.body;

        // Bước 2. Kiểm tra dữ liệu 
        if (!email || !password) {
            return res.status(400).json({
                message: "Vui lòng nhập đủ email và password"
            });
        }

        // Bước 3 Kiểm tra email có tồn tại không
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Email không tồn tại"
            });
        }

        // Bước 4: Kiểm tra mật khẩu
        // so sánh password gố với password đã hash
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                message: "Sai mật khẩu"
            });
        }

        // Bước 5 tạo token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        // Bước 6 Trả kết quả đăng nhập thành công
        return res.status(200).json({
            message: "Đăng nhập thành công",
            token: token,
            user: user
        });

    } catch (error) {
        // Bước 7 Lỗi server
        return res.status(500).json({
            message: "Lỗi Server",
            error: error.message
        });
    }
};


// Lấy thông tin của chính mình
export const getMyProfile = async (req, res) => {
    try {
        // Bước 1. Lấy userId từ token đã giải mã
        const userId = req.user.userId
        // Bước 2 tìm user trong DB
        const user = await User.findById(userId).select("-password")
        // Bước 3 nếu không có user
        if (!user) {
            return res.status(404).json({
                message: "User không tồn tại"
            })
        }
        // Bước 4 trả kết quả
        return res.status(200).json({
            message: "Lấy thông tin profile của bạn thành công",
            user: user
        })

    } catch (error) {
        // Bước  nếu có lỗi server
        return res.status(500).json({
            message: "Lỗi Server",
            error: error.message
        });
    }
}


// Lấy thông tin tất cả user
export const getAllUser = async (req, res) => {
    try {
        // Bước 1 : Lấy toàn bộ user từ database
        const users = await User.find().select("-password");

        // Bước 2 : Trả kết quả thành công
        return res.status(200).json({
            message: "Lấy danh sách user thành công",
            users: users
        })

    } catch (error) {
        // Bước 3 nếu có lỗi server
        return res.status(500).json({
            message: "Lỗi Server",
            error: error.message
        });
    }
};


// Lấy thông tin user theo id
export const getUserById = async (req, res) => {
    try {
        // Lấy id từ URL
        const { id } = req.params;

        // Tìm user theo id
        const user = await User.findById(id).select("-password");


        // Nếu không tìm thấy user
        if (!user) {
            return res.status(404).json({
                message: "User không tồn tại"
            });
        }

        // Trả thông tin user
        return res.status(200).json({
            message: "Thông tin user",
            user: user
        });

    } catch (error) {
        // Lỗi server
        return res.status(500).json({
            message: "Lỗi Server",
            error: error.message
        });
    }
};


// change password - đổi mật khẩu
export const changePassword = async (req, res) => {
    try {
        // Bước 1. lấy userId từ token
        const userId = req.user.userId
        // Bước 2. lấy dữ liệu từ body
        const { oldPassword, newPassword } = req.body

        // Bước 3. kiểm tra thiếu dữ liệu
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                message: "Mời nhập đủ mật khẩu cũ và mật khẩu mới"
            })
        }

        // Bước 4. tìm user trong DB
        const user = await User.findById(userId)
        // Bước 5. nếu không có user
        if (!user) {
            return res.status(404).json({
                message: "User không tồn tại"
            })
        }
        // Bước 6. kiểm tra mật khẩu cũ
        const isMatch = await bcrypt.compare(oldPassword, user.password)
        // Bước 7. nếu mật khẩu cũ sai
        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu cũ không chính xác"
            })
        }
        // Bước 8. hash mật khẩu mới
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        // Bước 9. cập nhật password mới
        user.password = hashedNewPassword
        // Bước 10. lưu vào DB
        await user.save()
        // Bước 11. trả kết quả
        return res.status(200).json({
            message: "Cập nhật mật khẩu thành công"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Lỗi Server",
            error: error.message
        })
    }
}


// Cập nhật thông tin user
export const updateUser = async (req, res) => {
    try {
        // Bước 1: Lấy id
        const { id } = req.params;
        // Bước 2 : Lấy dữ liệu mới
        const { name, email } = req.body;
        // Bước 3: Kiểm tra user có tồn tại không
        const user = await User.findById(id);
        // Bước 4: Nếu không có user
        if (!user) {
            return res.status(404).json({
                message: "User không tồn tại"
            });
        }

        // Bước 5: cập nhật dữ liệu 
        user.name = name || user.name
        user.email = email || user.email

        // Bước 6 lưu lại
        await user.save()

        // Bước 7 trả kết quả
        return res.status(200).json({
            message: "Cập nhật user thành công",
            user: user
        })

    } catch (error) {
        // Bước 8 nếu có lỗi server
        return res.status(500).json({
            message: "Lỗi Server",
            error: error.message
        });
    }
};


// Xóa user
export const deleteUser = async (req, res) => {
    try {
        // Bước 1: Lấy id
        const { id } = req.params;

        // Bước 2: Kiểm tra user có tồn tại không
        const user = await User.findById(id);
        // Bước 3: Nếu không có user
        if (!user) {
            return res.status(404).json({
                message: "User không tồn tại"
            });
        }

        // Bước 4: xóa user
        // cách 1. xóa theo object đã tìm được
        await user.deleteOne()
        // cách 2. xóa thẳng theo id
        // await User.findByIdAndDelete(id)

        // Bước 5 trả kết quả
        return res.status(200).json({
            message: "Xóa user thành công",
        })

    } catch (error) {
        // Bước 8 nếu có lỗi server
        return res.status(500).json({
            message: "Lỗi Server",
            error: error.message
        });
    }
};


