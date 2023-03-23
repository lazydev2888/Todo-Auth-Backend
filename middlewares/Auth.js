import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {

    const {token} = req.cookies;
    // console.log(token);
    if(!token)
    return res.status(400).json({ success:false, message: "Please Login to access this route" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    req.user = await User.findById(decoded.userId);
    next();
};