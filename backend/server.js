import express from "express";
import { connectDB } from "./config/db.js"
import ToDoRoutes from "./routes/ToDo.js"
import UserRoutes from "./routes/User.js"
import authRoutes from "./routes/auth.js"
import cors from "cors"

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: ""
};

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/ToDo", ToDoRoutes);
app.use("/api/User", UserRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});
