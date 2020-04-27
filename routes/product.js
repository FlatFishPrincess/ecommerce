import express from 'express';
import { create, read, remove, update } from '../controllers/product';
import { requireSignIn, isAuth, isAdmin } from '../controllers/auth';
import { userById } from '../controllers/user';
import { productId } from '../controllers/product';

const router = express.Router();

router.get('/product/:productId', read)
router.post(
  '/product/create/:userId',
  requireSignIn,
  isAuth,
  isAdmin,
  create
);
router.delete(
  '/product/:productId/:userId',
  requireSignIn,
  isAuth,
  isAdmin,
  remove
);
router.put(
  '/product/:productId/:userId',
  requireSignIn,
  isAuth,
  isAdmin,
  update
);

router.param('userId', userById);
router.param('productId', productId)

export default router;