import express from 'express';
import { getDashboardStats, syncStats } from '../controllers/statsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getDashboardStats);
router.post('/sync', protect, syncStats);

export default router;
