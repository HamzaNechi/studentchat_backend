import chat from "../models/chat.js";


/************************** chat de groupe ********************************************************* */
export function createGroupeRoom(req,res){
    var room;
    if(req.file === undefined){
        const _chat=new chat({
            admin:req.body.admin,
            users:req.body.arrUser,
            nom:req.body.nom
        })
        room=_chat;
    }else{
        const _chat=new chat({
            admin:req.body.admin,
            users:req.body.arrUser,
            nom:req.body.nom,
            image:`${req.protocol}://${req.get('host')}/images/groupe/${req.file.filename}`
        })
        room=_chat;
    }

    room.save().then(doc=>{
        res.status(200).json(doc)
    }).catch(err=>{
        res.status(200).json(err)
    })
}


export async function getAllGroupsForUser(req,res){
    const room=await chat.find({$and: [{users:req.body.user_id},{nom: {"$ne": null}}]})
    if(room){
        res.status(200).json(room)
    }else{
        res.status(405).json({error:"Error !"})
    }
}


export function quitterGroupe(req,res){
    chat.updateOne({_id:req.body.chat_id},{
        $pullAll:{
            users:[{_id:req.body.user_id}]
        }
    }).then(doc => {
        res.status(200).json(doc)
    }).catch(err =>{
        res.status(405).json(err)
    })
}


/**************************** Room privé ( chat entre deux personnes ) ****************************/

export async function getPrivateChat(req,res){
    const chat_id_1=req.body.currentUser+req.body.chatUser;
    const chat_id_2=req.body.chatUser+req.body.currentUser;
    const room=await chat.findOne({$or:[{chat_id:chat_id_1},{chat_id:chat_id_2}]}).populate('users')
    if(room){
        res.status(200).json(room._id)
    }else{
        const add=createPrivateRoom(req.body.currentUser,req.body.chatUser)
        if(add != null ){
            res.status(200).json(add._id)
        }else{
            res.status(400).json({error : "Problém serveur !"})
        }
    }
}

function createPrivateRoom(currentUser,chatUser){
    let arrUser=[]
    let chat_id;
    arrUser=[currentUser,chatUser]
    chat_id=currentUser+chatUser // si le chat est privé chat_id te5ou concaténation id de deux user
    const room=new chat({
            chat_id:chat_id,
            users:arrUser,
        })
    room.save().then(doc=>{
        return doc;
        }).catch(err=>{
            return err;
        })
}
