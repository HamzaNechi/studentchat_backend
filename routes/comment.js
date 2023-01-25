import { getCommentForPost,addComment,deleteComment } from "../controllers/comment.js";
import { Router } from "express";


const router=Router();

router
    .route("/")
    .post(addComment);

router
    .route("/:post_id_comment")
    .get(getCommentForPost);

router
    .route("/delete/:id_comment")
    .get(deleteComment);

export default router;