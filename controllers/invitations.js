import invitation from "../models/invitations.js";
import user from '../models/user.js'


export function sendRequest(req,res){
    const invi=new invitation({
        destinataire:req.body.destinataire,
        expediteur:req.body.expediteur,
    })

    invi.save().then(doc=>{
        res.status(201).json(doc)
    }).catch(err=>{
        res.status(400).json(err)
    })
}


export function acceptRequest(req,res){
    const inv=invitation.findOne({_id:req.body.id})
    if(inv){
        inv.updateOne({status:"accepter"}).then(doc=>{
            res.status(200).json(doc)
        }).catch(err=>{
            res.status(400).json(err)
        })
    }else{
        res.status(404).json({error :"invitation not found !"})
    }
}


//if user refuse invi then delete invi
export function refuseRequest(req,res){
    invitation.findOneAndDelete({_id:req.body.id})
    .then(doc=>{
        res.status(200).json(doc)
    })
    .catch(err=>{
        res.status(400).json(err)
    })
}

export async function getInvitationsAttente(req,res){
    const invs =await invitation.find({destinataire:req.params.currentUser, status:"En attente"}).populate({ 
        path: 'destinataire', 
      }).populate({ 
        path: 'expediteur', 
      })
    if(invs){
        res.status(200).json(invs)
    }else{
        res.status(400).json({err:"Probléme !"})
    }
}


