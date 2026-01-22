import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/User.js"

export const registerAuth = async (req, res) => {
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
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        res.cookie("refreshJwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Lax',
            maxAge: 1 * 24 * 60 * 60 * 1000   //days:hours:minutes:seconds:miliseconds
        });

        res.cookie("accessJwt", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Lax',
            maxAge: 1 * 60 * 60 * 1000        //hours:minutes:seconds:miliseconds
        });

        res.status(200).json({ success: true });
    } catch(error){
        console.log("Error in registering user:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const loginAuth = async (req, res) => {
    const { Username, Password } = req.body;

    if(!Username || !Password){
        res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    try{
        const user = await User.findOne({ Username }).exec();

        if(!user){
            return res.status(400).json({ success: false, message: "Invalid Username" });
        }

        const isMatch = bcrypt.compareSync(Password, user.Password);

        if(isMatch){
            const accessToken = generateAccessToken(user.id);
            const refreshToken = generateRefreshToken(user.id);
            
            res.cookie("refreshJwt", refreshToken, {
                httpOnly: true,
                secure: true, 
                sameSite: 'Lax',
                maxAge: 7 * 24 * 60 * 60 * 1000   //days:hours:minutes:seconds:miliseconds
            });

            res.cookie("accessJwt", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'Lax',
                maxAge: 1 * 60 * 60 * 1000        //hours:minutes:seconds:miliseconds
            });

            res.status(200).json({ success: true });
        }else{
            res.status(400).json({ success: false, message: "Invalid Password" });
        }
    } catch(error){
        console.log("Error in login user:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const refreshAuth = async (req, res) => {
    const cookies = req.cookies;

    if(!cookies || !cookies.refreshJwt){
        console.log("Hi",cookies);
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const refreshToken = cookies.refreshJwt;
    console.log(refreshToken)
    try{
        console.log("Refreshing access token!");
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.id);

        if(!user){
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const accessToken = generateAccessToken(decoded.id);

        res.cookie("accessJwt", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Lax',
            maxAge: 1 * 60 * 60 * 1000        //hours:minutes:seconds:miliseconds
        });

        res.status(200).json({ success: true });
    } catch(error){
        console.log("Error in verifying refresh token:", error);
        res.status(401).json({ success: false, message: "Forbidden" });
    }
};

export const logoutAuth = async (req, res) => {
    const cookies = req.cookies;

    if(!cookies || !(cookies.refreshJwt && cookies.accessJwt)){
        console.log("Bad logout", cookies);
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    res.clearCookie("refreshJwt");
    res.clearCookie("accessJwt");

    res.status(200).json({ success: true });
};

const generateAccessToken = (id) => {
    return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h"});
};

const generateRefreshToken = (id) => {
    return jwt.sign({id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d"});
}