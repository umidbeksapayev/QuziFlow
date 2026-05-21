/**
 * Calculates spaced repetition parameters using the SM-2 algorithm.
 * 
 * @param {number} repetitions - Consecutive correct answers (n)
 * @param {number} interval - Current interval in days (I)
 * @param {number} easinessFactor - Current easiness factor (EF)
 * @param {number} grade - User response quality: 0 (blackout) to 5 (perfect)
 * @returns {object} Updated parameters: { repetitions, interval, easinessFactor, nextReviewAt }
 */
export function calculateSM2(repetitions, interval, easinessFactor, grade) {
  let nextRepetitions;
  let nextInterval;
  let nextEasinessFactor;

  // Grade >= 3 means correct response
  if (grade >= 3) {
    if (repetitions === 0) {
      nextInterval = 1; // 1 day
    } else if (repetitions === 1) {
      nextInterval = 6; // 6 days
    } else {
      nextInterval = Math.round(interval * easinessFactor);
    }
    nextRepetitions = repetitions + 1;
  } else {
    // Incorrect response, reset repetitions and interval
    nextRepetitions = 0;
    nextInterval = 1; // Try again tomorrow
  }

  // Update Easiness Factor (EF)
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  nextEasinessFactor = easinessFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  
  // Ensure EF doesn't drop below 1.3 (per standard SM-2 rules)
  if (nextEasinessFactor < 1.3) {
    nextEasinessFactor = 1.3;
  }

  // Calculate Next Review Date
  const nextReviewAt = new Date();
  nextReviewAt.setDate(nextReviewAt.getDate() + nextInterval);
  // Set to midnight of that day for cleaner scheduling
  nextReviewAt.setHours(0, 0, 0, 0);

  return {
    repetitions: nextRepetitions,
    interval: nextInterval,
    easinessFactor: parseFloat(nextEasinessFactor.toFixed(2)),
    nextReviewAt
  };
}
