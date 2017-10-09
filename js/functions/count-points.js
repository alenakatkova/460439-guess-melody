const quickTime = 30000;
const amountOfQuestions = 10;
const maxMistakes = 4;
const lostPoints = 2;
const minEarnedPoints = 1;
const maxEarnedPoints = 2;
const minPoints = (amountOfQuestions - (maxMistakes - 1) * lostPoints) * minEarnedPoints;
const maxPoints = amountOfQuestions * maxEarnedPoints;

/**
 * Функция считает набранные игроком баллы
 * @param {Array} answers - массив ответов пользователя
 * Каждый ответ - это объект вида {isAnswerCorrect: {Boolean}, time: {Number}},
 * в котором isAnswerCorrect указывает на правильность ответа, а time - на время в мс, за которое игрок дал ответ
 * @param {Number} attemptsLeft - количество оставшихся нот
 * @returns {Number} - количество набранных очков
 */

const countPoints = (answers, attemptsLeft) => {
  if (answers.length < amountOfQuestions || attemptsLeft === 0) {
    return -1;
  }
  return answers.reduce((points, answer) => {
    if (answer.isAnswerCorrect && answer.time < quickTime) {
      return points + maxEarnedPoints;
    } else if (answer.isAnswerCorrect) {
      return points + minEarnedPoints;
    } else {
      return points - lostPoints;
    }
  }, 0);
};

export {countPoints, minPoints, maxPoints, amountOfQuestions, minEarnedPoints, quickTime};
