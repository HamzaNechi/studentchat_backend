import { Router } from "express";
import { sendRequest,acceptRequest,refuseRequest,getInvitationsAttente} from "../controllers/invitations.js";

const router=Router();


router
    .route("/:currentUser")
    .get(getInvitationsAttente);

router
    .route("/send")
    .post(sendRequest);

router
    .route("/accept")
    .post(acceptRequest);

router
    .route("/refuse")
    .post(refuseRequest);

export default router;

