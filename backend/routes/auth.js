import express from "express"
import { registerAuth, loginAuth } from "../controllers/auth.js"

const router = express.Router();

router.post("/register", registerAuth);
router.get("/login", loginAuth);

export default router;