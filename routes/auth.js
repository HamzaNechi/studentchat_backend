import express from 'express'
import { register,login,refreshToken,activate,resetpassword,findEmail } from '../controllers/AuthController.js';
import multer from '../middlewares/multer-config.js';

const router = express.Router()


router.post('/register', multer, register)
router.post('/login', login)
router.post('/refresh-token', refreshToken)
router.post('/Activation',activate)
router.post('/resetpassword',resetpassword)
router.post('/findEmail',findEmail)


export default router







