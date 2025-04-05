import express from "express"
import { registerAuth, loginAuth, refreshAuth } from "../controllers/auth.js"

const router = express.Router();

router.post("/register", registerAuth);
router.get("/login", loginAuth);
router.get("/refresh", refreshAuth);

export default router;