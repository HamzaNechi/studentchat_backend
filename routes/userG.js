import {verfiCode,destroy,update,show,index,updateUser,search,SendEmail} from '../controllers/UserController.js';
import express from 'express';
import authenticate from '../middlewares/authenticate.js';
const router = express.Router()


router.get('/index',index)
router.get('/show/:userId',show)
router.put('/update',update)
router.post('/delete',destroy)
router.put('/updateUser',updateUser)
router.get('/search',search)
router.post('/SendEmail',SendEmail)

export default router;