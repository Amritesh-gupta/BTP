import express from "express";
import multer from "multer";
import { auth, fileAuth } from "../middleware/auth.js";
import { File, Photo } from "../models/fileModal.js";

const fileRouter = new express.Router();

const upload = multer({
    limits : 1000000
})

fileRouter.post("/agenda/upload",auth,upload.single("agenda"),async(req,res)=>{
    await File.findOneAndUpdate({fileName : "agenda"},{fileName : "agenda", file : req.file.buffer},{upsert : true}).exec();
    res.status(200).send("Agenda uploaded");
})

fileRouter.post("/schedule/upload",auth,upload.single("schedule"),async(req,res)=>{
    await File.findOneAndUpdate({fileName : "schedule"},{fileName : "schedule", file : req.file.buffer},{upsert : true}).exec();
    res.status(200).send("Schedule uploaded");
})

fileRouter.post("/photo/upload",auth,async(req,res)=>{
    const file = new Photo(req.body);
    try{
        await file.save();
        res.status(201).send('Photo Saved');
    }
    catch(err){
        res.status(500).send(err);
    }
})

fileRouter.get("/photo",async(req,res)=>{
    try{
        const photos = await Photo.find({fileName : "userPhoto"}).exec();
        const isEmpty = Object.keys(photos).length === 0;
        if(isEmpty){
            throw new Error("No photos are uploaded");
        }
        res.send(photos);
    }
    catch(err){
        res.status(404).send(err);
    }
})

fileRouter.get("/schedule",fileAuth,async(req,res)=>{
    try{
        const _file = await File.findOne({fileName : "schedule"}).exec();

        if(!_file){
            throw new Error("Not uploaded");
        }

        res.set("Content-Type", "application/pdf");
        res.send(_file.file);
    }
    catch(err){
        res.status(404).send({
            message: `${err}`
         });
    }
})

fileRouter.get("/agenda",fileAuth,async(req,res)=>{
    try{
        const _file = await File.findOne({fileName : "agenda"}).exec();

        if(!_file){
            throw new Error("Not uploaded");
        }

        res.set("Content-Type", "application/pdf");
        res.send(_file.file);
    }
    catch(err){
        res.status(404).send({
            message: `${err}`
         });
    }
})

export default fileRouter;
