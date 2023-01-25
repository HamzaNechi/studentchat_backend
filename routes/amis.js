import { Router } from "express";
import { getAmis,deleteAmis } from "../controllers/amis.js";

const router=Router();



router
    .route('/:currentUser')
    .get(getAmis);

router
    .route('/delete')
    .post(deleteAmis);

export default router