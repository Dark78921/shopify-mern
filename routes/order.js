import { Router } from 'express';
import {
  createUserOrder,
  deleteUserOrder,
  editUserOrder,
  getOrders,
  getUsersOrders,
} from '../controllers/order.js';
import catchAsync from '../utils/catchAsync.js';
import { isAdmin, isLoggedIn, isOrderOwner } from '../middlewares/auth.js';

const router = Router({ mergeParams: true });

router.get('/', isAdmin, catchAsync(getOrders));
router
  .route('/:uid')
  .get(isLoggedIn, catchAsync(getUsersOrders))
  .post(isLoggedIn, catchAsync(createUserOrder));

router
  .route('/:uid/:oID')
  .put(isLoggedIn, isAdmin, catchAsync(editUserOrder))
  .delete(isLoggedIn, isOrderOwner, catchAsync(deleteUserOrder));

export default router;
