import {resultScreenContent} from '../data/results';

// const resultScreenContent = {
//   win: (place, amountOfPlayers, worseResults) => {
//     return `Вы заняли ${place}-ое место из ${amountOfPlayers} игроков. Это лучше чем у ${worseResults}% игроков`;
//   },
//   attemptsOut: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`,
//   timeOut: `Время вышло! Вы не успели отгадать все мелодии`
// };

/**
 * Функция определяет, какое сообщение будет показано игроку в конце игры
 * @param {Array} allScores - массив результатов всех игроков
 * @param {Object} playersResults - объект, сгенерированный по итогам последней игры. Включает в себя:
 * @param {Number} playersResults.score: число очков, набранное игроком
 * @param {Number} playersResults.attemptsLeft: число неиспользованных попыток
 * @param {Number} playersResults.time: оставшееся время
 * @returns {String} message - сообщение о выигрыше / проигрыше
 */

const showResults = (allScores, playersResults) => {
  if (playersResults.time === 0) {
    return resultScreenContent.timeOut.message;
  } else if (playersResults.attemptsLeft === 0) {
    return resultScreenContent.attemptsOut.message;
  }

  const currentScore = playersResults.score;
  allScores.push(currentScore);
  let scores = allScores.slice();
  scores.sort((a, b) => {
    return b - a;
  });
  const place = scores.indexOf(currentScore) + 1;
  const amountOfPlayers = scores.length;
  let worseResults = ((amountOfPlayers - place) / amountOfPlayers) * 100;
  worseResults = worseResults.toFixed();

  return resultScreenContent.win.message2(place, amountOfPlayers, worseResults);
};

export {resultScreenContent, showResults};
