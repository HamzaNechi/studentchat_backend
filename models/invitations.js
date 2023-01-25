import mongoose from "mongoose";

const inviSchema=mongoose.Schema({
    expediteur:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:true
    },
    destinataire:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:true
    },
    status:{
        type:String,
        default:"En attente"
    },
    date:{
        type:Date,
        default:Date.now()
    },
})

export default mongoose.model('invitation',inviSchema)