import express from "express";
import { getToDos, createToDo, deleteToDo, updateToDo, getProjects, getTasks } from "../controllers/ToDo.js"
import { verifyJWT } from "../middleware/auth.js"

const router = express.Router();

router.get("/ToDos", verifyJWT, getToDos);
router.get("/Projects", verifyJWT, getProjects);
router.get("/Tasks", verifyJWT, getTasks);
router.post("/create", verifyJWT, createToDo);
router.delete("/delete/:id", verifyJWT, deleteToDo);
router.put("/update/:id", verifyJWT, updateToDo);

export default router;