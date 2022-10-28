import express from "express";
import bcrypt from 'bcryptjs';
import {User} from '../models/userModal.js';
import { auth } from "../middleware/auth.js";

const userRouter = new express.Router();

userRouter.post('/signup',async(req,res)=>{

    try{
        const isUserThere = await User.find({username : req.body.username}).exec();
        const isEmpty = Object.keys(isUserThere).length === 0;
        if(!isEmpty){
            throw new Error("Username already registered");
        }
    }
    catch(err){
        return res.status(400).send({
            message: `${err}`
         });
    }
    const user = new User(req.body);
    user.hashPassword();
    user.generateToken();
    try{
        return res.status(201).send({
            message: "SIGNUP in successfully",
            user: user
        });
    }
    catch(err){
        console.log(err);
    }
})

userRouter.post('/login',async(req,res)=>{
    try{
        const isUserThere = await User.findOne({username : req.body.username}).exec();
        if(!isUserThere){
            throw new Error("No such username exixts");
        }
        const isPasswordSame = await bcrypt.compareSync(req.body.password,isUserThere.password);
        if(!isPasswordSame){
            throw new Error("Invalid username or password");
        }
        isUserThere.generateToken();
        return res.status(200).send({
            message: "Logged in successfully",
            user: isUserThere
        });
    }
    catch(err){
        return res.status(404).send({
            message: `${err}`
        });
    }
})


export default userRouter;