import mongoose from "mongoose";

const chatSchema=mongoose.Schema({
    chat_id:{
        type:String,
    },
    users:[{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:true
    }],
    nom:{
        type:String,
    },
    image:{
        type:String,
    },
    admin:{
        type:String,
    }
})

export default mongoose.model('chat',chatSchema)