import {resultScreenContent} from '../data/results';

/**
 * Функция определяет, какое сообщение будет показано игроку в конце игры
 * @param {Array} allScores - массив результатов всех игроков
 * @param {Object} playersResults - объект, сгенерированный по итогам последней игры. Включает в себя:
 * @param {Number} playersResults.score: число очков, набранное игроком
 * @param {Number} playersResults.attemptsLeft: число неиспользованных попыток
 * @param {Number} playersResults.time: оставшееся время
 * @returns {String} message - сообщение о выигрыше / проигрыше
 */

const generateFinishMessage = (allScores, playersResults) => {
  if (playersResults.time === 0) {
    return resultScreenContent.timeOut.message;
  } else if (playersResults.attemptsLeft === 0) {
    return resultScreenContent.attemptsOut.message;
  } else {
    const currentScore = playersResults.score;
    let scores = allScores.slice();
    scores.sort((a, b) => {
      return b - a;
    });
    const place = scores.indexOf(currentScore) + 1;
    const amountOfPlayers = scores.length;
    let worseResults = ((amountOfPlayers - place) / amountOfPlayers) * 100;
    worseResults = worseResults.toFixed();
    return resultScreenContent.win.message2(place, amountOfPlayers, worseResults);
  }
};

export default generateFinishMessage;
