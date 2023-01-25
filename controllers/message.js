import messages from "../models/messages.js";
import chat from "../models/chat.js";
import { json } from "express";
import user from "../models/user.js";

export function send(req,res){
    if(membre(req.body.chat_id,req.body.user_id)){
        const msg=new messages({
            chat_id:req.body.chat_id,
            user_id:req.body.user_id,
            content:req.body.content,
        })
        msg.save().then(doc=>{
            res.status(200).json(doc)
        }).catch(err=>{
            res.status(400).json(err)
        })
    }else{
        res.status(400).send("Tu n'est pas un membre")
    }
    
}



export async function getMSgChat(req,res){
    const msg=await messages.find({chat_id:req.params.chat_id}).populate('user_id')
    if(msg){
        res.status(200).json(msg)
    }else{
        res.status(400).json({error:"Problem !"})
    }
}


//test si l'utilisateur est un membre de cette room
async function membre(chat_id,user_id){
    const _room=await chat.find({_id:chat_id},{users:user_id});
    if(_room){
        return true;
    }else{
        return false;
    }
}

export async function getAllMsgUser(req,res){
    const _room=await chat.find({users:req.body.user_id});
    const msgs=await messages.find({chat_id: _room}).populate('user_id').sort({_id: -1});
    const msg_list=await messages.find({_id:msgs,user_id: { $ne:req.body.user_id} }).populate('chat_id').populate('user_id').sort({_id: -1});

    if(msg_list){
        res.json(msg_list)
    }else{
        res.json({err:"ouups !"})
    }
    
}


export async function FetchMsg(req,res){
   /* console.log("Fetch")
    console.log(req.body.chat_name)
    const _users=await user.find({username:req.body.chat_name});
    const _room=await chat.find({$or:[{chat_id:_users},{nom:req.body.chat_name}]});
    const msgs=await messages.find({chat_id: _room}).populate('user_id').sort({_id: -1});
    const msg_list=await messages.find({_id:msgs,user_id: { $ne:req.body.user_id} }).populate('chat_id').populate('user_id').sort({_id: -1});
    
    if(_room){
        res.json(_room)
    }else{
        res.json({err:"ouups !"})
    }*/
    console.log("fetch msg")
    
}




