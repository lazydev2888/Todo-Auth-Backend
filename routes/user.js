import express from "express";
import {  getAllUsers, getMyProfile, loginUser, registerUser, } from "../controllers/user.js";


const router = express.Router();

router.get("/all", getAllUsers );

router.post("/new", registerUser );
router.post("/login", loginUser );

router.get("/me").get(getMyProfile);





export default router;