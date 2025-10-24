import express from 'express';
import {
  getPortfolios,
  getPortfolio,
  getPortfolioBySlug,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  addSection,
  updateSection,
  deleteSection,
  exportPortfolio,
  getFeaturedPortfolios,
} from '../controllers/portfolioController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getPortfolios).post(protect, createPortfolio);

router.route('/featured').get(getFeaturedPortfolios);

router.route('/:id').get(getPortfolio).put(protect, updatePortfolio).delete(protect, deletePortfolio);

router.route('/slug/:slug').get(getPortfolioBySlug);

router.route('/:id/export').get(protect, exportPortfolio);

router.route('/:id/sections').post(protect, addSection);

router
  .route('/:id/sections/:sectionId')
  .put(protect, updateSection)
  .delete(protect, deleteSection);

export default router;