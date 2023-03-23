import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";




                        // Register User

    export const registerUser = async (req, res, next) => {
      try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if(user)
        return  next( new ErrorHandler("User already exists", 400));
        
        // res.status(400).json({ success:false, message: "User already exists" 
    
        const hashedpassword = await bcrypt.hash(password, 10);

        user = await User.create({ name, email, password : hashedpassword,});

        sendCookie(user, res, "User Registered Successfully", 201);
      } catch (error) {
        next(error);
      }
       
    }
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if(!user)
    return next( new ErrorHandler("Invalid Credentials", 400));
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch)
    return next( new ErrorHandler("Invalid Crdentials", 400));
    sendCookie(user, res, `Welcome ${user.name}`, 200);
    } catch (error) {
        next(error);
    }
}


export const getMyProfile =  (req, res) => {
    try {
        res.status(200).json({ success:true, user: req.user });     
    } catch (error) {
        next(error);
    }
    
   
};

export const logoutUser = async (req, res) => {
  try {
    res.status(200).cookie("token", "", { expires: new Date(Date.now()) })
  .json({ success:true, user : req.user });
  } catch (error) {
    next(error);
    
  }
};
                       