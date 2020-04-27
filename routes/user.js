import express from 'express';
import { userById } from '../controllers/user';
import { requireSignIn, isAuth, isAdmin } from '../controllers/auth';

const router = express.Router();

router.get('/secret/:userId', requireSignIn, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile
  })
})
router.param("userId", userById);

export default router;