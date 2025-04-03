import express from "express"
import { registerUser, loginUser, updateUser, deleteUser } from "../controllers/User.js"

const router = express.Router();

router.post("/register", registerUser);
router.get("/login", loginUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;