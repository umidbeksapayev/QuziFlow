import prisma from '../prisma/db.js';

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user statistics
    const stats = await prisma.userStatistics.findUnique({
      where: { userId }
    });

    // Fetch study sessions for heatmap (e.g. last 30 days or all)
    const sessions = await prisma.studySession.findMany({
      where: { userId },
      orderBy: { date: 'asc' },
      take: 365 // Last year of activity
    });

    // Fetch all user statuses to compute card mastery status
    const cardStatuses = await prisma.userCardStatus.findMany({
      where: { userId },
      include: {
        card: true
      }
    });

    // Count all available cards (global + user's custom)
    const totalCardsCount = await prisma.flashcard.count({
      where: {
        OR: [
          { userId: null },
          { userId }
        ]
      }
    });

    // Calculate card stages:
    // New (no status), Learning (interval < 7 days), Mastered (interval >= 7 days)
    const reviewedCardIds = cardStatuses.map(s => s.cardId);
    const newCardsCount = totalCardsCount - reviewedCardIds.length;
    
    let learningCardsCount = 0;
    let masteredCardsCount = 0;
    
    cardStatuses.forEach(s => {
      if (s.interval >= 7) {
        masteredCardsCount++;
      } else {
        learningCardsCount++;
      }
    });

    // Calculate Category Performance / Weak Topics Analytics
    const categoryStatsMap = {};

    cardStatuses.forEach(status => {
      const category = status.card.category;
      if (!categoryStatsMap[category]) {
        categoryStatsMap[category] = {
          category,
          total: 0,
          correct: 0,
          wrong: 0
        };
      }

      categoryStatsMap[category].total++;
      if (status.lastResponse === 'correct') {
        categoryStatsMap[category].correct++;
      } else if (status.lastResponse === 'wrong') {
        categoryStatsMap[category].wrong++;
      }
    });

    // Format category stats with accuracy percentage
    const categoryProgress = Object.values(categoryStatsMap).map(c => {
      const accuracy = c.total > 0 ? Math.round((c.correct / c.total) * 100) : 0;
      return {
        category: c.category,
        totalSolved: c.total,
        correct: c.correct,
        wrong: c.wrong,
        accuracy
      };
    });

    // Sort categories to find weakest (lowest accuracy first)
    const weakTopics = [...categoryProgress]
      .filter(c => c.wrong > 0)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 5); // top 5 weakest

    // Format final response
    return res.json({
      overview: {
        totalSolved: stats ? stats.totalSolved : 0,
        correctAnswers: stats ? stats.correctAnswers : 0,
        wrongAnswers: stats ? stats.wrongAnswers : 0,
        accuracy: stats ? stats.accuracy : 0.0,
        streak: stats ? stats.streak : 0,
        lastActiveDate: stats ? stats.lastActiveDate : null
      },
      mastery: {
        total: totalCardsCount,
        new: newCardsCount < 0 ? 0 : newCardsCount,
        learning: learningCardsCount,
        mastered: masteredCardsCount
      },
      categoryProgress,
      weakTopics,
      activity: sessions.map(s => ({
        date: s.date,
        correctCount: s.correctCount,
        wrongCount: s.wrongCount,
        totalCount: s.correctCount + s.wrongCount
      }))
    });
  } catch (error) {
    console.error('GetDashboardStats error:', error);
    return res.status(500).json({ message: 'Statistikalarni yuklashda xatolik' });
  }
};
