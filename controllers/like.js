import like from '../models/like.js'
import post from '../models/post.js'


export function addLike(req,res){
    console.log("post id = "+req.body.post)
    console.log("user id = "+req.body.user)
    const _like=new like({
        post:req.body.post,
        user:req.body.user
    })
    
    _like.save().then(doc=>{
        res.status(201).json(doc)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}

export function isLike(req,res){
    const _like=like.findOne({post:req.body.post,user:req.body.user})
    if(_like){
        res.status(200).json({msg:'true'})
    }else{
        res.status(404).json({err:'Like not found'})
    }
}

export async function getAllPostLikes(req,res){
    console.log("android id : "+req.params.post_id);
    const likes=await like.find({post:req.params.post_id})
    if(likes){
        res.status(200).json(likes)
        likes.forEach(element => {
            console.log("id post = "+element.post+" id user = "+element.user)
        });
    }else{
        res.status(400).json({err:"Error !"})
        console.log("erreur")
    }
}

export function deleteLike(req,res){
    const lk=like.findOneAndDelete({post:req.body.post,user:req.body.user})
    .then(doc=>{
        res.status(202).json({message:"deleted!"})
    })
    .catch(err=>{
        res.status(402).json({err})
    })
}