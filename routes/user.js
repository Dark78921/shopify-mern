import { Router } from 'express';
import { loginUser, signupUser } from '../controllers/user.js';
import catchAsync from '../utils/catchAsync.js';

const router = Router({ mergeParams: true });

router.post('/signup', catchAsync(signupUser));
router.post('/login', catchAsync(loginUser));

export default router;
