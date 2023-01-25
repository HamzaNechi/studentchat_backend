import { Router } from "express";
import { send, getMSgChat,getAllMsgUser,FetchMsg } from "../controllers/message.js";

const router=Router();


router
    .route('/:chat_id')
    .get(getMSgChat);

router
    .route('/send')
    .post(send);

router
    .route('/msg_user')
    .post(getAllMsgUser);

router
    .route('/fetch')
    .post(FetchMsg);


export default router;