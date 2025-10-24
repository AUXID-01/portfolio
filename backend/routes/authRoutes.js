import express from 'express';
import {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword,
  verifyToken,
} from '../controllers/authControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/verify', protect, verifyToken);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);

export default router;