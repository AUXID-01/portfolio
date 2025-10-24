import express from 'express';
import {
  getTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  useTemplate,
} from '../controllers/templateController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/').get(getTemplates).post(protect, authorize('admin'), createTemplate);

router
  .route('/:id')
  .get(getTemplate)
  .put(protect, authorize('admin'), updateTemplate)
  .delete(protect, authorize('admin'), deleteTemplate);

router.route('/:id/use').post(protect, useTemplate);

export default router;

