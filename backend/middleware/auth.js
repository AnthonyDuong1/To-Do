import jwt from "jsonwebtoken"

export const verifyJWT = async (req, res, next) => {
    const cookies = req.cookies;

    if(!cookies || !cookies.accessJwt){
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try{
        const decoded = jwt.verify(cookies.accessJwt, process.env.ACCESS_TOKEN_SECRET)
        req.UserId = decoded.id;
        next();
    } catch(error){
        res.status(403).json({ success: false, message: "Forbidden" });
    }
}