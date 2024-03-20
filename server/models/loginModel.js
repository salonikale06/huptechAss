import mongoose from "mongoose";


    const loginSchema = new mongoose.Schema({
        Name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        quotes:{
            type:String,
        }
    })

const loginUser = mongoose.model("login",loginSchema);


export default loginUser;