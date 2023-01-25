import mongoose from "mongoose";

const post=mongoose.Schema({
    description:{
        type:String,
        require:false,
    },
    image:{
        type:String,
        default:"empty"
    },
    date:{
        type:Date,
        default:Date.now()
    },
    time:{
        type:Number,
        default:new Date().getTime()
    },
    user:{
        type : mongoose.Types.ObjectId,
        ref:'user'
    },
    author:{
        type :String,
    }

})

export default mongoose.model("Post",post)