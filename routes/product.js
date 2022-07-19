import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '../controllers/product.js';
import { isLoggedIn, isAdmin } from '../middlewares/auth.js';
import catchAsync from '../utils/catchAsync.js';

const router = Router();

router
  .route('/')
  .get(catchAsync(getProducts))
  .post(isLoggedIn, isAdmin, catchAsync(createProduct));

router
  .route('/:pID')
  .get(catchAsync(getProduct))
  .put(isLoggedIn, isAdmin, catchAsync(updateProduct))
  .delete(isLoggedIn, isAdmin, catchAsync(deleteProduct));

export default router;
