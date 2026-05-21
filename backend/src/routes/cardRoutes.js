import express from 'express';
import {
  getCards,
  getDueCards,
  getMistakeCards,
  answerCard,
  createCard,
  deleteCard
} from '../controllers/cardController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getCards);
router.get('/due', protect, getDueCards);
router.get('/mistakes', protect, getMistakeCards);
router.post('/', protect, createCard);
router.post('/:id/answer', protect, answerCard);
router.delete('/:id', protect, deleteCard);

export default router;
