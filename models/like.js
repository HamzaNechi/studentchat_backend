import mongoose from "mongoose";


const likeSchema=mongoose.Schema({
    post:{
        type:mongoose.Types.ObjectId,
        ref:'Post'
    },
    user:{
        type : mongoose.Types.ObjectId,
        ref:'user'
    }
})

export default mongoose.model('like',likeSchema);