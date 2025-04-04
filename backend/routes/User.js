import express from "express"
import { updateUser, deleteUser } from "../controllers/User.js"
import { verifyJWT } from "../middleware/auth.js"

const router = express.Router();

router.put("/update/:id", verifyJWT, updateUser);
router.delete("/delete/:id", verifyJWT, deleteUser);

export default router;