import ToDo from "../models/ToDo.js"
import mongoose from "mongoose"

/* export const getToDos = async (req, res) => {
    try{
        const ToDos = await ToDo.find({});
        res.status(200).json({ success: true, data: ToDos });
    } catch(error){
        console.log("Error in fetching ToDos:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
} */

export const createToDo = async (req, res) => {
    const todo = req.body;
    todo.UserId = req.UserId;

    if(!todo.Task || !todo.Project || !todo.Description || !todo.State){
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newToDo = new ToDo(todo);

    try{
        await newToDo.save();
        res.status(201).json({ success: true, data: newToDo });
    } catch(error){
        console.log("Error in creating ToDo:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteToDo = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid ToDo Id" });
    }

    try{
        await ToDo.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "ToDo Deleted" });
    } catch(error){
        console.log("Error in deleting ToDo:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateToDo = async (req, res) => {
    const { id } = req.params;
    const todo = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid ToDo Id" });
    }

    try{
        const updatedToDo = await ToDo.findByIdAndUpdate(id, todo, { new: true });
        res.status(200).json({ success: true, data: updatedToDo });
    } catch(error){
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getProjects = async (req, res) => {
    const userID = req.UserId;

    try{
        const Projects = await ToDo.distinct("Project", { UserId: userID });
        res.status(200).json({ success: true, data: Projects });
    } catch(error){
        console.log("Error in fetching Projects:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getTasks = async (req, res) => {
    const userID = req.UserId;

    try{
        const taskObjectArray = await ToDo.find({ UserId: userID }, { _id: 0, Task: 1});
        const Tasks = taskObjectArray.map(task => task.Task);
        console.log(Tasks)
        res.status(200).json({ success: true, data: Tasks });
    } catch(error){
        console.log("Error in fetching Tasks:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getToDo = async (req, res) => {
    const userID = req.UserId;

    try{
        const Task = await ToDo.find({ UserId: userID, State: "To Do" }, { _id: 0, Task: 1, Project: 1, Description: 1 })
        res.status(200).json({ success: true, data: Task });
    } catch(error){
        console.log("Error in fetching To Do Tasks", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getInProgress = async (req, res) => {
    const userID = req.UserId;

    try{
        const Task = await ToDo.find({ UserId: userID, State: "In Progress" }, { _id: 0, Task: 1, Project: 1, Description: 1 })
        res.status(200).json({ success: true, data: Task });
    } catch(error){
        console.log("Error in fetching To Do Tasks", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getDone = async (req, res) => {
    const userID = req.UserId;

    try{
        const Task = await ToDo.find({ UserId: userID, State: "Done" }, { _id: 0, Task: 1, Project: 1, Description: 1 })
        res.status(200).json({ success: true, data: Task });
    } catch(error){
        console.log("Error in fetching To Do Tasks", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}