import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"


const user=mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        unique:true,
        required:true,
    },
    role:{
        type:String,
        default:"User"
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    image:String,
    status:{
        type:String,
        default:"hors ligne"
    },
    Genre:{
        type: String,
    },

    Date_Naissance:{
        type: String,
    },

    Classe:{
        type: String,
    },

    Filiere:{
        type: String,   
    },

    IsActive:{
        type: Boolean,
        default: false,
    },
    ActivationCode:{
        type: String,
    },
    Banne:{
        type: Boolean,
        default:false,
    }

},{
    timestamp:true
})

export default mongoose.model('user',user)