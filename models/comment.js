import mongoose from "mongoose";

const commentSchema=mongoose.Schema({
    post:{
        type:mongoose.Types.ObjectId,
        ref:'post',
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:true
    },
    content:{
        type:String,
        required:true
    }
})

export default mongoose.model('comment',commentSchema)