import express from 'express';
import { create, read, update, remove, list, categoryById } from '../controllers/category';
import { requireSignIn, isAuth, isAdmin } from '../controllers/auth';
import { userById } from '../controllers/user';

const router = express.Router();

router.get('/category/:categoryId', read)
router.post(
  '/category/create/:userId',
  requireSignIn,
  isAuth,
  isAdmin,
  create
);
router.put(
  '/category/:categoryId/:userId',
  requireSignIn,
  isAuth,
  isAdmin,
  update
);
router.delete(
  '/category/:categoryId/:userId',
  requireSignIn,
  isAuth,
  isAdmin,
  remove
);
router.get('/categories', list)
router.param('categoryId', categoryById);
router.param('userId', userById);

export default router;