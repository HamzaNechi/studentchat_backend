import User from '../models/user.js'
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { sendConfirmationEmail, sendResetPassword } from '../server/nodemailer.js'
//import { generate } from '../controllers/gencodecontroller.js';



//find Email
 
export const findEmail = (req,res,next)=>{
    User.findOne
    ({email
    :req.body.Email})
    .then(user=>{
        if(user){
            sendResetPassword(user.email,user.ActivationCode)
            return res.status(200).json({
                message:"email exist"
                
            })
        }
        else{
            return res.status(409).json({
                message:"email does'nt exist"
            })
        }
    }
    )
}

//reset password activation code
export const resetpassword = (req,res,next)=>{
        User.findOne
        ({ActivationCode
        :req.body.ActivationCode})
        .then(user=>{
        if(user){
            bcrypt.hash(req.body.Password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    })
                }
                else{
                    user.password=hash
                    user.save()
                    return res.status(200).json({
                        message:"password reseted"
                    })
                }
            })
        }
        else{
            return res.status(409).json({
                message:"Activation code wrong"
            })
        }
    })

} 




//signup verifie email exist or not   
export const register  = (req,res,next)=>{
  
    User.findOne
    ({email
    :req.body.Email})
    .then(user=>{
        if(user){
            console.log("email exist");
            return res.status(409).json({
                message:"email exist"
            })
        }
        
        else{
            const characters = 
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let Activationcode="";
            for (let i = 0; i < 20; i++) {
                Activationcode += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            bcrypt.hash(req.body.Password,10,(err,hash)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        error:err
                    })
                }
                else{
                    const user = new User({
                            username: req.body.Username,
                            email: req.body.Email,
                            password: hash,
                            image: `${req.protocol}://${req.get('host')}/images/user/${req.file.filename}`,
                            Genre: req.body.Genre,
                            Date_Naissance: req.body.Date_Naissance,
                            role: req.body.Role,
                            Classe: req.body.Classe,
                            Filiere: req.body.Filiere,
                            ActivationCode: Activationcode,
                    })
                    user.save().then(user =>{
                        console.log("success registre");
                    res.json(user)
        })
        .catch(error =>{
            console.log("problém serveur");
            res.json({
                message: 'An error occured!'
            })
        })
        sendConfirmationEmail(user.email,user.ActivationCode)
                }
            })
        }
    })
 
}

export const login = (req,res,next )=>{
    var Username =req.body.Username
    var Password =req.body.Password
      User.findOne({email:Username})
        .then(user =>{
            if(user){
                bcrypt.compare(Password,user.password,function(err,result){
                    if(err){
                        return res.status(404).json({
                            error:err
                        })
                        }
                    if(result){
                        if(!user.IsActive){
                            return res.status(404).json({
                            message: "user not activated"
                        })
                    
                    }else if(user.Banne){
                        return res.status(404).json({
                            message: "user banned"
                        })
                    }else{
                        let token = jwt.sign({Username:user.email},'verySecretValue',{expiresIn:'1h'})
                        updateStatus(user._id)
                        return res.json(user)
                }
            }
                    else{
                        return res.status(404).json({
                message:'Password does not matched'
                })
                    }      
            })
            }else{
                return res.status(404).json({
                    message:'No user found'
                })
            }
        })
    }

function updateStatus(user_id){
    User.findOneAndUpdate({_id:user_id},{status : "En ligne"}).then(doc=>{
        console.log("user connected")
    }).catch(err=>{
        console.log("error connect")
    })
}

 //verfif Activaationcode and activate user

export const activate = (req,res,next)=>{
    User.findOne
    ({ActivationCode
    :req.body.ActivationCode})
    .then(user=>{
        if(user){
            User.update
            ({ActivationCode
            :req.body.ActivationCode},
            {$set:{IsActive:true}})
            .then(user=>{
                res.json({
                    message:"user activated"
                })
            }
            )
        }
        else{
            return res.status(409).json({
                message:"code not exist"
            })
        }
    })
}
  





export const refreshToken = (req,res,next)=>{
    const refreshToken = req.body.refreshToken
    jwt.verify(refreshToken,'refreshtokensecret',function(err,decode){
        if(err){
            res.json({
                err
            })
        }else{
            let token = jwt.sign({name:decode.name},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRE_TIME})
            let refreshToken=req.body.refreshToken
            res.json({
                message: 'Token Refreshed successfully!',
                token,
                refreshToken
            })
        }
    })
}


    
