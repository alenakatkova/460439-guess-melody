import {GameData} from '../data/game-data';

/**
 * Функция считает набранные игроком баллы
 * @param {Array} answers - массив ответов пользователя
 * Каждый ответ - это объект вида {isAnswerCorrect: {Boolean}, TIME: {Number}, audio: {String|Array}},
 * в котором isAnswerCorrect указывает на правильность ответа, а TIME - на время в мс, за которое игрок дал ответ
 * @param {Number} attemptsLeft - количество оставшихся нот
 * @returns {Number} - количество набранных очков
 */

const countPoints = (answers, attemptsLeft) => {
  if (answers.length < GameData.AMOUNT_OF_QUESTIONS || attemptsLeft === 0) {
    return -1;
  }
  return answers.reduce((points, answer) => {
    if (answer === null) {
      return points;
    } else if (answer.isAnswerCorrect && answer.time < GameData.QUICK_TIME) {
      return points + GameData.counting.MAX_EARNED_POINTS;
    } else if (answer.isAnswerCorrect) {
      return points + GameData.counting.MIN_EARNED_POINTS;
    } else {
      return points - GameData.counting.LOST_POINTS;
    }
  }, 0);
};

export default countPoints;
