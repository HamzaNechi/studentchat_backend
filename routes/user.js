import express from 'express';
import multer from '../middlewares/multer-config.js';
import authenticate from '../middlewares/authenticate.js';
import { signin, signup,getAllUser,deleteUser,getUserById,getUserConnected,FetchUser,logout} from '../controllers/user.js';
  
const router = express.Router();

router
    .route('/')
    .get(
      authenticate,
      getAllUser)
    .post(
      multer,
      signup);

router
  .route('/signin')
  .post(signin);

router
  .route('/logout')
  .patch(logout);

  
router
  .route('/fetch')
  .post(FetchUser);
  

router
    .route('/delete')
    .post(deleteUser);

router
    .route('/me')
    .get(authenticate,
        getUserConnected);

router
  .route('/getuser')
  .post(getUserById);




  
export default router;