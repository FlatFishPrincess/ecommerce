import express from 'express';
import { signUp, signIn, signOut, requireSignIn } from '../controllers/auth';
import { userSignupValidator } from '../validator/index';


const router = express.Router();

router.post('/signup', userSignupValidator(), signUp);
router.post('/signin', signIn);
router.get('/signout', signOut)

router.get('/hello', requireSignIn, (req, res)=> {
  res.send('hello');
})
export default router;