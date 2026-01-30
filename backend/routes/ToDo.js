import express from "express";
import { getToDo, getInProgress, getDone, createToDo, deleteToDo, updateToDo, getProjects, getTasks } from "../controllers/ToDo.js"
import { verifyJWT } from "../middleware/auth.js"

const router = express.Router();

router.get("/GetToDo", verifyJWT, getToDo);
router.get("/GetInProgress", verifyJWT, getInProgress);
router.get("/GetDone", verifyJWT, getDone);
router.get("/Projects", verifyJWT, getProjects);
router.get("/Tasks", verifyJWT, getTasks);
router.post("/create", verifyJWT, createToDo);
router.delete("/delete/:id", verifyJWT, deleteToDo);
router.put("/update/:id", verifyJWT, updateToDo);

export default router;