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
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: false,     //change once we get https working
            sameSite: 'None',
            maxAge: 1 * 24 * 60 * 60 * 1000   //days:hours:minutes:seconds:miliseconds
        });

        res.status(200).json({ success: true, data: newUser, token: accessToken });
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
            res.cookie("jwt", refreshToken, {
                httpOnly: true,
                secure: false,          //Change once we get https working
                sameSite: 'None',
                maxAge: 1 * 24 * 60 * 60 * 1000   //days:hours:minutes:seconds:miliseconds
            });

            res.status(200).json({ success: true, data: user, token: accessToken });
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

    console.log("cookies");

    if(!cookies || !cookies.jwt){
        console.log("Hi",cookies);
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const refreshToken = cookies.jwt;

    try{
        console.log("Refreshing access token!");
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.id);

        if(!user){
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const accessToken = generateAccessToken(decoded.id);
        res.status(200).json({ success: true, token: accessToken });
    } catch(error){
        console.log("Error in verifying refresh token:", error);
        res.status(401).json({ success: false, message: "Forbidden" });
    }
};

const generateAccessToken = (id) => {
    return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "20s"});
};

const generateRefreshToken = (id) => {
    return jwt.sign({id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "1d"});
}