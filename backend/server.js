import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import fs from "fs"
import https from "https"
import ToDoRoutes from "./routes/ToDo.js"
import UserRoutes from "./routes/User.js"
import authRoutes from "./routes/auth.js"
import { connectDB } from "./config/db.js"

const app = express();
const PORT = process.env.PORT || 5000;

var key = fs.readFileSync("../../..//mkcert/localhost-key.pem");
var cert = fs.readFileSync("../../..//mkcert/localhost.pem");
var options = {
    key : key,
    cert: cert
};

const corsOptions = {
    credentials: true,
    origin: "https://localhost:50387"
};

//Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/ToDo", ToDoRoutes);
app.use("/api/User", UserRoutes);
app.use("/api/auth", authRoutes);

var server = https.createServer(options, app);

server.listen(PORT, () => {
    connectDB();
    console.log("Server started at https://localhost:" + PORT)
});
