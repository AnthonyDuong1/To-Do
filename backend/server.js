import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import ToDoRoutes from "./routes/ToDo.js"
import UserRoutes from "./routes/User.js"
import authRoutes from "./routes/auth.js"
import { connectDB } from "./config/db.js"

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: ""
};

//Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/ToDo", ToDoRoutes);
app.use("/api/User", UserRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});
