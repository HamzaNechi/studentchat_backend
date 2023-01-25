import { Router } from "express";
import multer from "../middlewares/multer-config.js";
import { getPrivateChat,createGroupeRoom,getAllGroupsForUser,quitterGroupe } from "../controllers/chat.js";

const router=Router();



router
    .route('/')
    .post(getPrivateChat);


router
    .route('/groupe')
    .post(getAllGroupsForUser);


router
    .route('/add_room')
    .post(
        multer,
        createGroupeRoom);

router
    .route('/quitter_groupe')
    .put(quitterGroupe);

export default router;