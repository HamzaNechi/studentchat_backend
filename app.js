import express, { json } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.js';
import UserRoute from './routes/userG.js'
import authRoutes from './routes/auth.js';
import postRoutes from './routes/post.js';
import likeRoutes from './routes/like.js';
import commentRoutes from './routes/comment.js';
import invitationRoutes from './routes/invitations.js';
import amisRoutes from './routes/amis.js';
import chatRoutes from './routes/chat.js'
import msgRoutes from './routes/messages.js'
import path from 'path'
import { fileURLToPath } from 'url';
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io';
import bodyParser from 'body-parser';



const app=express();
app.use(cors());
app.use(express.json());
const hostname='localhost';
const port=process.env.PORT || 9090;
const databaseName = 'StudentChat';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://localhost:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

  const server=http.createServer(app);

  const io=new Server(server,{
    cors:{
        origin:`http://${hostname}:${port}/`,
        methods:["GET","POST"],
    }
})

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


io.on("connection",(socket)=>{
	console.log("socket connect");


  
  socket.on("send_chat",(msg)=>{
    console.log("message socket chat: ",msg)
    io.emit("receive_msg_send",msg)
  })




  socket.on("send_membre",(u)=>{
    console.log("membre groupe socket : ",u)
    io.emit("receive_membre",u)
  })


  socket.on("delete_membre",(u)=>{
    console.log("membre remove groupe socket : ",u)
    io.emit("remove_membre",u)
  })

 

  
  
	
	socket.on("disconnect",() => {
		console.log("User disconnect",socket.id);
	});
    
});


  app.use('/user',userRoutes);
  app.use('/api/user',UserRoute)
  app.use('/post',postRoutes);
  app.use('/like',likeRoutes);
  app.use('/comment',commentRoutes);
  app.use('/invitations',invitationRoutes);
  app.use('/amis',amisRoutes);
  app.use('/chat',chatRoutes);
  app.use('/message',msgRoutes);
  app.use('',authRoutes);

  //load image from url
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  app.use("/images/user",express.static(path.join(__dirname , "public/images/user")))
  app.use("/images/post",express.static(path.join(__dirname , "public/images/post")))
  app.use("/images/groupe",express.static(path.join(__dirname , "public/images/groupe")))

server.listen(port,hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
})