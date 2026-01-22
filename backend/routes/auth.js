import express from "express"
import { registerAuth, loginAuth, refreshAuth, logoutAuth } from "../controllers/auth.js"

const router = express.Router();

router.post("/register", registerAuth);
router.post("/login", loginAuth);
router.post("/refresh", refreshAuth);
router.get("/logout", logoutAuth);

export default router;