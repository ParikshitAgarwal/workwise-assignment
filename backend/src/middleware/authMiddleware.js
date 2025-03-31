import jwt from "jsonwebtoken"
import { findUserServiceById } from "../models/userModel.js";

const protectRoute = async (req, res, next) => {
    try {        
        console.log(req.headers["authorization"])
        const token = req.headers["authorization"].replace("Bearer ", "");
        console.log(token)
        if (!token) {
            return res.status(401).json({
                message: "No authentication token, access denied"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        const user = await findUserServiceById(decoded.userId);
        console.log(user)
        if (!user) return res.status(401).json({
            message: "Token is not valid"
        });

        req.user = user;
        next();
    } catch (error) {
        console.log("Authentication Error:", error.message);
        res.status(401).json({
            message: "Token is not valid"
        })
    }
}

export default protectRoute