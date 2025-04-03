import express from "express";
import { connectDB } from "./config/db.js"
import ToDoRoutes from "./routes/ToDo.js"

const app = express();

app.listen(5201, () => {
    connectDB();
    console.log("Server started at http://localhost:5201");
});

app.use("/api/ToDo", ToDoRoutes);


