
import express from "express";                          // Import Express để tạo app (ứng dụng backend)
import morgan from "morgan";                            // Import morgan để log request (giúp debug)
import userRoutes from "./routes/user.routes.js";       // Import các route liên quan đến user
import productRoutes from "./routes/product.routes.js"; // Import các route liên quan đến product
import orderRoutes from "./routes/order.routes.js";     // Import các route liên quan đến order

//
import cors from "cors";

// Tạo ứng dụng Express
const app = express();

//
app.use(cors());

// Middleware: parse JSON → req.body
app.use(express.json());

// Morgan - Middleware ghi log request
app.use(morgan('combined'));

// Routes
app.use("/users", userRoutes);          //  /users/register
app.use("/products", productRoutes);    //  /products
app.use("/orders", orderRoutes)         //  /orders


// Export app để server.js dùng (app.listen)
export default app;
