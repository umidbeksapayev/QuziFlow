import prisma from '../prisma/db.js';
import { calculateSM2 } from '../utils/spacedRepetition.js';

// Get today's date in YYYY-MM-DD format
const getTodayDateString = () => {
  return new Date().toISOString().split('T')[0];
};

export const getCards = async (req, res) => {
  try {
    const { category, difficulty, search, onlyCustom, random, limit } = req.query;
    const userId = req.user.id;

    // Build filter query
    const where = {
      OR: [
        { userId: null }, // Global cards
        { userId: userId } // User's own custom cards
      ]
    };

    if (onlyCustom === 'true') {
      where.OR = [{ userId: userId }];
    }

    if (category) {
      where.category = category;
    }

    if (difficulty) {
      where.difficulty = difficulty;
    }

    if (search) {
      where.OR = [
        { question: { contains: search } },
        { answer: { contains: search } },
        { tags: { contains: search } }
      ].map(cond => ({ ...cond, ...(onlyCustom === 'true' ? { userId } : { OR: [{ userId: null }, { userId }] }) }));
    }

    // Fetch cards with their status for the current user
    const cards = await prisma.flashcard.findMany({
      where,
      include: {
        userStatuses: {
          where: { userId }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Format response to flatten userStatus for easier frontend consumption
    const formattedCards = cards.map(card => {
      const status = card.userStatuses[0] || null;
      // Remove raw array to avoid nesting
      const { userStatuses, ...cardData } = card;
      return {
        ...cardData,
        status: status ? {
          repetitions: status.repetitions,
          interval: status.interval,
          easinessFactor: status.easinessFactor,
          nextReviewAt: status.nextReviewAt,
          lastResponse: status.lastResponse
        } : null
      };
    });

    let finalCards = formattedCards;
    if (random === 'true') {
      finalCards = finalCards.sort(() => Math.random() - 0.5);
    }

    if (limit && limit !== 'all') {
      const limitVal = parseInt(limit, 10);
      if (!isNaN(limitVal)) {
        finalCards = finalCards.slice(0, limitVal);
      }
    }

    return res.json(finalCards);
  } catch (error) {
    console.error('GetCards error:', error);
    return res.status(500).json({ message: 'Savollarni olishda xatolik yuz berdi' });
  }
};

export const getDueCards = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();

    // Due cards are:
    // 1. Cards that have no UserCardStatus (never reviewed)
    // 2. Cards where nextReviewAt <= now
    
    // First, find all statuses for this user
    const userStatuses = await prisma.userCardStatus.findMany({
      where: { userId }
    });

    const reviewedCardIds = userStatuses.map(status => status.cardId);
    
    // Statuses that are due
    const dueStatusCardIds = userStatuses
      .filter(status => new Date(status.nextReviewAt) <= now)
      .map(status => status.cardId);

    // Fetch matching cards: either never reviewed, or reviewed and due
    const dueCards = await prisma.flashcard.findMany({
      where: {
        OR: [
          {
            id: { notIn: reviewedCardIds },
            OR: [
              { userId: null },
              { userId }
            ]
          },
          {
            id: { in: dueStatusCardIds }
          }
        ]
      },
      include: {
        userStatuses: {
          where: { userId }
        }
      }
    });

    const formattedCards = dueCards.map(card => {
      const status = card.userStatuses[0] || null;
      const { userStatuses, ...cardData } = card;
      return {
        ...cardData,
        status: status ? {
          repetitions: status.repetitions,
          interval: status.interval,
          easinessFactor: status.easinessFactor,
          nextReviewAt: status.nextReviewAt,
          lastResponse: status.lastResponse
        } : null
      };
    });

    return res.json(formattedCards);
  } catch (error) {
    console.error('GetDueCards error:', error);
    return res.status(500).json({ message: 'Kutilyotgan savollarni olishda xatolik' });
  }
};

export const getMistakeCards = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get card statuses where the last response was "wrong"
    const mistakeStatuses = await prisma.userCardStatus.findMany({
      where: {
        userId,
        lastResponse: 'wrong'
      },
      select: {
        cardId: true
      }
    });

    const mistakeCardIds = mistakeStatuses.map(s => s.cardId);

    if (mistakeCardIds.length === 0) {
      return res.json([]);
    }

    const cards = await prisma.flashcard.findMany({
      where: {
        id: { in: mistakeCardIds }
      },
      include: {
        userStatuses: {
          where: { userId }
        }
      }
    });

    const formattedCards = cards.map(card => {
      const status = card.userStatuses[0] || null;
      const { userStatuses, ...cardData } = card;
      return {
        ...cardData,
        status: status ? {
          repetitions: status.repetitions,
          interval: status.interval,
          easinessFactor: status.easinessFactor,
          nextReviewAt: status.nextReviewAt,
          lastResponse: status.lastResponse
        } : null
      };
    });

    return res.json(formattedCards);
  } catch (error) {
    console.error('GetMistakeCards error:', error);
    return res.status(500).json({ message: 'Xatolar tarixini olishda xatolik' });
  }
};

export const answerCard = async (req, res) => {
  try {
    const userId = req.user.id;
    const cardId = req.params.id;
    const { knew } = req.body; // true = "Bilaman", false = "Bilmayman"

    if (knew === undefined) {
      return res.status(400).json({ message: 'Javob turi (knew) ko\'rsatilishi shart' });
    }

    // Check if card exists
    const card = await prisma.flashcard.findUnique({
      where: { id: cardId }
    });

    if (!card) {
      return res.status(404).json({ message: 'Savol topilmadi' });
    }

    // Map binary answer to SM-2 quality grade:
    // knew = true -> grade 4 (correct with some effort)
    // knew = false -> grade 1 (incorrect, but familiar)
    const grade = knew ? 4 : 1;

    // Get current status or create default
    let status = await prisma.userCardStatus.findUnique({
      where: {
        userId_cardId: { userId, cardId }
      }
    });

    const isNewAnswer = !status;

    const currentRepetitions = status ? status.repetitions : 0;
    const currentInterval = status ? status.interval : 0;
    const currentEF = status ? status.easinessFactor : 2.5;

    // Calculate new SM-2 values
    const sm2 = calculateSM2(currentRepetitions, currentInterval, currentEF, grade);

    // Save status
    status = await prisma.userCardStatus.upsert({
      where: {
        userId_cardId: { userId, cardId }
      },
      update: {
        repetitions: sm2.repetitions,
        interval: sm2.interval,
        easinessFactor: sm2.easinessFactor,
        nextReviewAt: sm2.nextReviewAt,
        lastResponse: knew ? 'correct' : 'wrong'
      },
      create: {
        userId,
        cardId,
        repetitions: sm2.repetitions,
        interval: sm2.interval,
        easinessFactor: sm2.easinessFactor,
        nextReviewAt: sm2.nextReviewAt,
        lastResponse: knew ? 'correct' : 'wrong'
      }
    });

    // Update Statistics & StudySession
    const todayStr = getTodayDateString();

    const stats = await prisma.userStatistics.findUnique({
      where: { userId }
    });

    let newStreak = stats ? stats.streak : 0;
    const lastActive = stats ? stats.lastActiveDate : null;

    if (isNewAnswer || status.lastResponse !== (knew ? 'correct' : 'wrong')) {
      // Calculate daily streak
      if (!lastActive) {
        newStreak = 1;
      } else {
        const lastDate = new Date(lastActive);
        const todayDate = new Date(todayStr);
        const diffTime = Math.abs(todayDate - lastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          // Active consecutive day
          newStreak += 1;
        } else if (diffDays > 1) {
          // Missed days, reset streak to 1
          newStreak = 1;
        }
        // If diffDays === 0, it is the same day, streak remains unchanged
      }
    }

    // Update User statistics fields
    const updatedCorrect = (stats ? stats.correctAnswers : 0) + (knew ? 1 : 0);
    const updatedWrong = (stats ? stats.wrongAnswers : 0) + (knew ? 0 : 1);
    const updatedTotal = updatedCorrect + updatedWrong;
    const updatedAccuracy = updatedTotal > 0 ? parseFloat(((updatedCorrect / updatedTotal) * 100).toFixed(1)) : 0;

    await prisma.userStatistics.update({
      where: { userId },
      data: {
        totalSolved: updatedTotal,
        correctAnswers: updatedCorrect,
        wrongAnswers: updatedWrong,
        accuracy: updatedAccuracy,
        streak: newStreak === 0 ? 1 : newStreak,
        lastActiveDate: todayStr
      }
    });

    // Log in StudySession for heatmap/activity logs
    const session = await prisma.studySession.findFirst({
      where: {
        userId,
        date: todayStr
      }
    });

    if (session) {
      await prisma.studySession.update({
        where: { id: session.id },
        data: {
          correctCount: session.correctCount + (knew ? 1 : 0),
          wrongCount: session.wrongCount + (knew ? 0 : 1)
        }
      });
    } else {
      await prisma.studySession.create({
        data: {
          userId,
          date: todayStr,
          correctCount: knew ? 1 : 0,
          wrongCount: knew ? 0 : 1
        }
      });
    }

    return res.json({
      message: 'Javob qabul qilindi',
      status: {
        repetitions: status.repetitions,
        interval: status.interval,
        easinessFactor: status.easinessFactor,
        nextReviewAt: status.nextReviewAt,
        lastResponse: status.lastResponse
      },
      streak: newStreak === 0 ? 1 : newStreak
    });
  } catch (error) {
    console.error('AnswerCard error:', error);
    return res.status(500).json({ message: 'Javobni saqlashda xatolik yuz berdi' });
  }
};

export const createCard = async (req, res) => {
  try {
    const { question, answer, category, difficulty, tags } = req.body;
    const userId = req.user.id;

    if (!question || !answer || !category || !difficulty) {
      return res.status(400).json({ message: 'Barcha majburiy maydonlarni kiriting (savol, javob, kategoriya, qiyinchilik)' });
    }

    const card = await prisma.flashcard.create({
      data: {
        question,
        answer,
        category,
        difficulty,
        tags: tags || '',
        userId
      }
    });

    return res.status(201).json(card);
  } catch (error) {
    console.error('CreateCard error:', error);
    return res.status(500).json({ message: 'Savol yaratishda xatolik yuz berdi' });
  }
};

export const deleteCard = async (req, res) => {
  try {
    const cardId = req.params.id;
    const userId = req.user.id;

    // Check if card belongs to user
    const card = await prisma.flashcard.findUnique({
      where: { id: cardId }
    });

    if (!card) {
      return res.status(404).json({ message: 'Savol topilmadi' });
    }

    if (card.userId !== userId) {
      return res.status(403).json({ message: 'Sizda ushbu savolni o\'chirish huquqi yo\'q' });
    }

    await prisma.flashcard.delete({
      where: { id: cardId }
    });

    return res.json({ message: 'Savol muvaffaqiyatli o\'chirildi' });
  } catch (error) {
    console.error('DeleteCard error:', error);
    return res.status(500).json({ message: 'Savolni o\'chirishda xatolik yuz berdi' });
  }
};
