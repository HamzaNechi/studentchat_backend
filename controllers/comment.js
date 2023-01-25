import comment from "../models/comment.js";


export async function getCommentForPost(req,res){
    const comments=await comment.find({post:req.params.post_id_comment}).populate('user').sort({_id:1})
    if(comments){
        res.status(200).json(comments)
    }else{
        res.status(404).json({error : "No data found !"})
    }
}


export function addComment(req,res){
    const com=new comment({
        post:req.body.post,
        user:req.body.user,
        content:req.body.content
    });

    com.save().then(doc=>{
        res.status(201).json(doc)
    }).catch(err=>{
        res.status(400).json(err)
    })
}

export function deleteComment(req,res){
    console.log("delete comment id : "+req.params.id_comment)
    const com=comment.findOneAndDelete({_id:req.params.id_comment})
    .then(doc=>{
        res.status(200).json(doc);;
    }).catch(err=>{
        res.status(405).json({err});
    })
}