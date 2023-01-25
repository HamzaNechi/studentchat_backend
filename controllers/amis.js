import invitation from "../models/invitations.js";
import user from "../models/user.js";


export async function getAmis(req,res){
    console.log("getAmis current user "+req.params.currentUser)
    const invdes =await invitation.find({
      $or: [ { destinataire:req.params.currentUser }, { expediteur:req.params.currentUser } ], status:"accepter"}
      ).populate({ 
        path: 'destinataire', 
        path: 'expediteur', 
      }).populate({ 
        path: 'expediteur',
        path: 'destinataire',  
      })
      var amis=[];

      invdes.forEach(element => {
        if(element.expediteur._id == req.params.currentUser){
            amis.push(element.destinataire)
        }else{
            amis.push(element.expediteur)
        }
        
        console.log("fel expediteur" +element.expediteur.username)
      });      
      amis.sort( compare );
      if(amis){
        res.status(200).json(amis)
        }else{
         res.status(400).json({err:"Problem !"})
       }   
}

function compare( a, b ) {
    if ( a.status < b.status ){
      return -1;
    }
    if ( a.status > b.status ){
      return 1;
    }
    return 0;
  }


export function deleteAmis(req,res){
    invitation.findOneAndDelete({$or:[{destinataire:req.body.currentUser,expediteur:req.body.userDelete,status:"accepter"},{destinataire:req.body.userDelete,expediteur:req.body.currentUser,status:"accepter"}]})
    .then(doc=>{
        res.status(200).json(doc)
    })
    .catch(err=>{
        res.status(400).json(err)
    })
}