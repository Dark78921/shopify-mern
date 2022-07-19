import { Router } from 'express';
import { createReview, deleteReview } from '../controllers/review.js';
import { isLoggedIn, isReviewAuthor } from '../middlewares/auth.js';
import catchAsync from '../utils/catchAsync.js';

const router = Router({ mergeParams: true });

router.post('/', isLoggedIn, catchAsync(createReview));
router.delete('/:rID', isLoggedIn, isReviewAuthor, catchAsync(deleteReview));

export default router;
