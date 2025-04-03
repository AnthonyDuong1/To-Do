import ToDo from "../models/ToDo.js"
import mongoose from "mongoose"

export const getToDos = async (req, res) => {
    try{
        const ToDos = await ToDo.find({});
        res.status(200).json({ success: true, data: ToDos });
    } catch(error){
        console.log("Error in fetching ToDos:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const createToDo = async (req, res) => {
    const todo = req.body;

    if(!todo.Task || !todo.Project || !todo.Description){
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newToDo = new ToDo(todo);

    try{
        await newToDo.save();
        res.status(201).json({ success: true, Data: newToDo });
    } catch(error){
        console.log("Error in creating ToDo:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteToDo = async (req, res) => {
    const { id } = req.params;

    try{
        await ToDo.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product Deleted" });
    } catch(error){
        console.log("Error in deleting ToDo:", error.message);
        res.status(404).json({ success: false, message: "Product not found" });
    }
};

export const updateToDo = async (req, res) => {
    const { id } = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    try{
        const updatedToDo = await ToDo.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedToDo });
    } catch(error){
        res.status(500).json({ success: false, message: "Server Error" });
    }
};