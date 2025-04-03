import User from "../models/User.js"
import bcrypt from "bcryptjs"
import mongoose from "mongoose"

export const registerUser = async (req, res) => {
    const user = req.body;

    if(!user.Username || !user.Password){
        res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    try{
        const salt = bcrypt.genSaltSync(12);
        const hashedPassword = bcrypt.hashSync(user.Password, salt);
        user.Password = hashedPassword;
    
        const newUser = new User(user);

        await newUser.save();
        res.status(200).json({ success: true, data: newUser });
    } catch(error){
        console.log("Error in registering user:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const loginUser = async (req, res) => {
    const { Username, Password } = req.body;

    if(!Username || !Password){
        res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    try{
        const user = await User.findOne({ Username });

        if(!user){
            return res.status(400).json({ success: false, message: "Invalid Username" });
        }

        const isMatch = bcrypt.compareSync(Password, user.Password);

        if(isMatch){
            res.status(400).json({ success: true, data: user });
        }else{
            res.status(400).json({ success: false, message: "Invalid Password" });
        }
    } catch(error){
        console.log("Error in login user:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const user = req.body;

    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(user.Password);
    user.Password = hashedPassword;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid User Id" });
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
        res.status(200).json({ success: true, data: updatedUser });
    } catch(error){
        console.log("Error in updating user:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid User Id" });
    }

    try{
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "User Deleted" });
    } catch(error){
        console.log("Error in deleting user:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};