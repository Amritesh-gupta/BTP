import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    fileName : String,
    file : Buffer
},{
    timestamps : true
})

const photoSchema = new mongoose.Schema({
    fileName : String,
    file : String
},{
    timestamps : true
})

export const File = new mongoose.model("uploadedfiles",fileSchema);
export const Photo = new mongoose.model("uploadedphotos",photoSchema);