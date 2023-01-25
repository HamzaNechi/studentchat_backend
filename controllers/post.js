import { response } from 'express'
import Post from '../models/post.js'
import user from '../models/user.js'


export async function getAll(req,res){
    const posts=await Post.find().populate('user').sort({_id: -1})
    if(posts){
        res.status(201).json({posts,message:'all posts getted'})
    }else{
       res.status(404).json({err,message:'no data found'}) 
    }
}


export function add(req,res){
    var post;
    if (req.file === undefined) {
        console.log(req.file +"undefined value!");
        const _post=new Post({
            description:req.body.description,
            user : req.body.user,
            author: req.body.author
        });
        post=_post;
    }else{
        console.log(req.file.filename)
        const _post=new Post({
            description:req.body.description,
            image : `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}`,
            user : req.body.user,
            author: req.body.author
        });
        post=_post;
    }
    post.save().then(doc=>{
        res.status(200).json(doc)
    })
    .catch(err=>{
        res.status(405).json(err)
    })
}


export async function share(req,res){
    const _post=await Post.findOne({_id:req.body.post})
    console.log(req.body.post)
    const Newpost=new Post({
        description:_post.description,
        image : _post.image,
        user : req.body.user,
        author: _post.author
    });
    Newpost.save().then(doc=>{
        res.status(200).json(doc)
    })
    .catch(err=>{
        res.status(405).json(err)
    })
}

export async function getPostUser(req,res){
    const posts=await Post.find({user:req.params.id_user})
    if(posts){
        res.status(201).json({posts,message:'all user getted'})
    }else{
       res.status(404).json({message:'no data found'}) 
    }
}

export function deletePost(req,res){
    const p=Post.findOneAndDelete({_id:req.params.id_post})
    .then(doc=>{
        res.status(200).json(doc)
    }).catch(err=>{
        res.status(405).json(err)
    })
}

export async function update(req,res){
    console.log(req.body)
    var upd;
    if(req.file === undefined){
        upd={
            description:req.body.description,
        }
    }else{
        upd={
            description:req.body.description,
            image : `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}`
        }
    }
    
    const p=await Post.findOneAndUpdate({_id:req.body.id},upd)
    try{
        res.status(200).json(p)
    }catch{
        res.status(405).json({error:"Problem !"})
    }
}


export async function search(req,res){
    const p=await Post.find({description:{ $regex: '.*' + req.body.content + '.*' , $options : 'i'}}).populate('user').sort({_id:-1});

        if(p){
            res.status(200).json({posts:p});
        }else{
            res.status(400).json({err:"Oouups !"});
        }
}
