import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        // Bước 1: lấy header authorization
        const authHeader = req.headers.authorization;

        // Bước 2: nếu không có token
        if (!authHeader) {
            return res.status(401).json({
                message: "Bạn chưa đăng nhập"
            });
        }

        // Bước 3: tách token khỏi Bearer
        const token = authHeader.split(" ")[1];

        // Bước 4: nếu không có token thật
        if (!token) {
            return res.status(401).json({
                message: "Token không hợp lệ"
            });
        }

        // Bước 5: verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Bước 6: gắn thông tin giải mã vào request
        req.user = decoded;

        // Bước 7: cho đi tiếp
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Token không hợp lệ hoặc đã hết hạn",
            error: error.message
        });
    }
};