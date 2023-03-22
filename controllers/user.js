import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const getAllUsers = async (req, res , next) => {}

                        // Register User

    export const registerUser = async (req, res, next) => {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if(user)
        return res.status(400).json({ success:false, message: "User already exists" 
    });
        const hashedpassword = await bcrypt.hash(password, 10);

        user = await User.create({ name, email, password : hashedpassword,});

        sendCookie(user, res, "User Registered Successfully", 201);
       
    }
export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if(!user)
    return res.status(400).json({ success:false, message: "Invalid Credentials"
    });
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch)
    return res.status(400).json({ success:false, message: "Invalid Credentials"
    });
    sendCookie(user, res, `Welcome ${user.name}`, 200);
}


export const getMyProfile = async (req, res, next) => {
    const id = "myid";

    const {token} = req.cookies.token;
    console.log(token);
    if(!token)
    return res.status(400).json({ success:false, message: "Please Login to access this route"
    });


        res.status(200).json({ success: true, user : "67587" });
};
                    
                       