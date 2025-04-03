import express from "express";
import { getToDos, createToDo, deleteToDo, updateToDo } from "../controllers/ToDo.js"

const router = express.Router();

router.get("/ToDos", getToDos);
router.post("/create", createToDo);
router.delete("/delete/:id", deleteToDo);
router.put("/update/:id", updateToDo);

export default router;