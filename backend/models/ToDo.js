import mongoose from "mongoose"

const ToDoSchema = new mongoose.Schema({
    Task: {
        type: String,
        required: true
    },
    Project: {
        type:String,
        required: true
    },
    Description: {
        type: String,
        requred: true
    },
    UserId: {
        type: String,
        required: true
    },

}, {
    timestamps: true
});

const ToDo = mongoose.model("ToDo", ToDoSchema);

export default ToDo;