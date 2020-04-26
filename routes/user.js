import express from 'express';
import { userById } from '../controllers/user';
import { requireSignIn } from '../controllers/auth';

const router = express.Router();

router.get('/secret/:userId', requireSignIn, (req, res) => {
  res.json({
    user: req.profile
  })
})
router.param("userId", userById);

export default router;