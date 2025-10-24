import express from 'express';
import {
  getDashboardStats,
  getUsers,
  updateUser,
  deleteUser,
  getAllPortfolios,
  featurePortfolio,
  deletePortfolio,
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Protect all routes and restrict to admin
router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getDashboardStats);

router.route('/users').get(getUsers);

router.route('/users/:id').put(updateUser).delete(deleteUser);

router.route('/portfolios').get(getAllPortfolios);

router.route('/portfolios/:id/feature').put(featurePortfolio);

router.route('/portfolios/:id').delete(deletePortfolio);

export default router;