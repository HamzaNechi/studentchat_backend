import { isObjectIdOrHexString } from 'mongoose';
import user from '../models/user.js';

export async function signin(req, res) {
    const u = await user.findOne({email:req.body.email,password:req.body.password});
    if(u != null){
       // const authToken=await u.generateAuthTokenAndSaveUser();
        console.log(u.status)
	    res.status(200).json(u)
    }else{
        res.status(403).json({err:"error"})
    }
}

export async function signup(req, res) {
   const us = new user({
        username: req.body.username,
        password:req.body.password,
        email: req.body.email,
        image:`${req.protocol}://${req.get('host')}/images/user/${req.file.filename}`,
    });
    us.save().then((doc)=>{
        us.generateAuthTokenAndSaveUser();
        res.status(201).json(doc)
    })
    .catch(err=>{
        res.status(405).json(err);
    })
}

export async function getAllUser(req,res){
   const users= await user.find();
    if(users){
        res.status(201).json(users)
    }else{
        res.status(404).json({err:"no data found"})
    }
}

export async function getUserConnected(req,res){
    res.send(req.user);
 }


export async function getUserById(req,res){
    const u=await user.findOne({_id:req.body.id})
    if(u){
        res.status(200).json(u)
    }else{
        res.status(404).json({error:"user controller ligne 47"})
    }
}

//get all user's post
export async function getAllUsersPost(req,res){
    const users= await user.findOne({username : req.params.name}).populate('Post');
    if(users){
        res.status(201).json({users,message:"All user"})
    }else{
        res.status(404).json({err:"no data found"})
    }
}


//fetch user with nom
export async function FetchUser(req,res){
    console.log(req.body.name)
    if(req.body.name == ""){
        res.status(400).json({err:"Oouups !"});
    }else{
        const users=await user.find({username:{ $regex: '.*' + req.body.name + '.*' , $options : 'i' }});

        if(users){
            res.status(200).json(users);
        }else{
            res.status(400).json({err:"Oouups !"});
        }
    }
    
}


//logout user
export async function logout(req,res){
    user.findOneAndUpdate({_id:req.body.id},{status:"hors ligne"}).then(doc =>{
        res.status(200).json(doc);
    }).catch(err =>{
        res.status(405).json(err);
    })
}


export function deleteUser(req,res){
    user.deleteOne(req.body).then(doc=>{
        res.status(200).json(doc);
    })
    .catch(err=>{
        res.status(400).json(err)
    })
}
