const QUICK_TIME = 30000;
const AMOUNT_OF_QUESTIONS = 10;
const MAX_ATTEMPTS = 4;
const LOST_POINTS = 2;
const MIN_EARNED_POINTS = 1;
const MAX_EARNED_POINTS = 2;
const MIN_SCORE = (AMOUNT_OF_QUESTIONS - (MAX_ATTEMPTS - 1) * LOST_POINTS) * MIN_EARNED_POINTS;
const MAX_SCORE = AMOUNT_OF_QUESTIONS * MAX_EARNED_POINTS;

/**
 * Функция считает набранные игроком баллы
 * @param {Array} answers - массив ответов пользователя
 * Каждый ответ - это объект вида {isAnswerCorrect: {Boolean}, time: {Number}},
 * в котором isAnswerCorrect указывает на правильность ответа, а time - на время в мс, за которое игрок дал ответ
 * @param {Number} attemptsLeft - количество оставшихся нот
 * @returns {Number} - количество набранных очков
 */

const countPoints = (answers, attemptsLeft) => {
  if (answers.length < AMOUNT_OF_QUESTIONS || attemptsLeft === 0) {
    return -1;
  }
  return answers.reduce((points, answer) => {
    if (answer.isAnswerCorrect && answer.time < QUICK_TIME) {
      return points + MAX_EARNED_POINTS;
    } else if (answer.isAnswerCorrect) {
      return points + MIN_EARNED_POINTS;
    } else {
      return points - LOST_POINTS;
    }
  }, 0);
};

export {countPoints, MIN_SCORE, MAX_SCORE, AMOUNT_OF_QUESTIONS, MIN_EARNED_POINTS, QUICK_TIME};
