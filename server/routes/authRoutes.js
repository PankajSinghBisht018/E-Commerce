import express from 'express';
import { loginUser, signUpUser, sendOtp, verifyOtp, resetPassword } from '../controllers/authController.js';
import { getUserProfile, updateUserProfile} from '../controllers/userController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signUpUser);
router.post('/auth/forgot-password', sendOtp);
router.post('/auth/verify-otp', verifyOtp);
router.post('/auth/reset-password', resetPassword);


router.route('/user/profile')
  .get(auth, getUserProfile)
  .put(auth, updateUserProfile);

export default router;
