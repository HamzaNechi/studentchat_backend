import { Router } from "express";
import { addLike ,isLike,getAllPostLikes,deleteLike} from "../controllers/like.js";

const router=Router();


router
    .route('/')
    .get(isLike)
    .post(addLike);

router
    .route('/:post_id')
    .get(getAllPostLikes);

router
    .route('/delete')
    .post(deleteLike);


export default router;