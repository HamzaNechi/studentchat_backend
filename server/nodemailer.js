
import nodemailer from 'nodemailer'
const transport = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:"dhif.ghassen@esprit.tn",
        pass:"GhAlone11951954",
    },
})

export function sendConfirmationEmail(Email,ActivationCode){
    transport.sendMail({
                 from:"dhif.ghassen@esprit.tn",
                 to:Email,
                subject:"Confirmer votre compte",
                 html:`<h1>Email de Confirmation</h1>
                 <h2>${ActivationCode}</h2>
                <p>pour activer votre compte,veuillez copier ce code </p>
                </div>`,
         }).catch((err)=>console.log(err))
}

// export default sendConfirmationEmail = (Email,ActivationCode)=>{
//     transport.sendMail({
//         from:"dhif.ghassen@esprit.tn",
//         to:Email,
//         subject:"Confirmer votre compte",
//         html:`<h1>Email de Confirmation</h1>
//         <h2>${ActivationCode}</h2>
//         <p>pour activer votre compte,veuillez copier ce code </p>
//         </div>`,
//     }).catch((err)=>console.log(err))
// };

// module.exports.sendResetPassword = (Email,ActivationCode)=>{
//     transport.sendMail({
//         from:"dhif.ghassen@esprit.tn",
//         to:Email,
//         subject:"reset Password",
//         html:`<h1>Reset Password</h1>
//         <h2>${ActivationCode}</h2>
//         <p>pour activer votre compte,veuillez copier ce code </p>
//         </div>`,
//     }).catch((err)=>console.log(err))
// }

export function sendResetPassword(Email,ActivationCode){
    transport.sendMail({
        from:"dhif.ghassen@esprit.tn",
        to:Email,
        subject:"reset Password",
        html:`<h1>Reset Password</h1>
        <h2>${ActivationCode}</h2>
        <p>pour activer votre compte,veuillez copier ce code </p>
        </div>`,
    }).catch((err)=>console.log(err))
}

export function sendSignal(Email,message){
    transport.sendMail({
        from:"dhif.ghassen@esprit.tn",
        to:Email,
        subject:"Signal",
        html:`<h1>Signal</h1>
        <h2>${message}</h2>
        <p>pls sheck this account </p>
        </div>`,
    }).catch((err)=>console.log(err))
}