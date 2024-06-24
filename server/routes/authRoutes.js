import express from 'express';
import { loginUser, signUpUser, sendOtp, verifyOtp, resetPassword } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signUpUser);
router.post('/auth/forgot-password', sendOtp);
router.post('/auth/verify-otp', verifyOtp);
router.post('/auth/reset-password', resetPassword);

export default router;
