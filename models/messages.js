import mongoose from "mongoose";

const messageSchema=mongoose.Schema({
    chat_id:{
        type:mongoose.Types.ObjectId,
        ref:'chat',
        required:true
    },
    user_id:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:true
    },
    content:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

export default mongoose.model('message',messageSchema)