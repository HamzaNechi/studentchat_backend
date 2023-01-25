import { Router } from "express";
import { getAll,add ,getPostUser,share,deletePost,update,search} from "../controllers/post.js";
import multer from "../middlewares/multer-config.js";


const router=Router();


router
    .route('/')
    .get(getAll)
    .post(
        multer,
        add);

router
    .route('/:id_user')
    .get(getPostUser);

router
    .route('/delete/:id_post')
    .get(deletePost);

router
    .route('/share')
    .post(share);

router
    .route('/update')
    .post(
        multer,
        update);

router
    .route('/fetch')
    .post(search);  
export default router;