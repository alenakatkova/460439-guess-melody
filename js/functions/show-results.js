import {compareNumbers} from '../util';

const messages = {
  win: (i, t, n) => {
    return `Вы заняли ${i}-ое место из ${t} игроков. Это лучше чем у ${n}% игроков`;
  },
  attemptsOut: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`,
  timeOut: `Время вышло! Вы не успели отгадать все мелодии`
};

/**
 * Функция определяет, какое сообщение будет показано игроку в конце игры
 * @param {Array} allScores - массив результатов всех игроков
 * @param {Object} playersResults - объект, сгенерированный по итогам последней игры. Включает в себя:
 * - score: число очков, набранное игроком
 * - attemptsLeft: число неиспользованных попыток
 * - time: оставшееся время
 * @returns {String} message - сообщение о выигрыше / проигрыше
 */

const showResults = (allScores, playersResults) => {
  if (playersResults.time === 0) {
    return messages.timeOut;
  } else if (playersResults.attemptsLeft === 0) {
    return messages.attemptsOut;
  }

  const currentScore = playersResults.score;
  allScores.push(currentScore);
  let scores = allScores.slice();
  scores.sort(compareNumbers);

  const i = scores.indexOf(currentScore) + 1;
  const t = scores.length;
  let n = ((t - i) / t) * 100;
  n = n.toFixed();

  return messages.win(i, t, n);
};

export {messages, showResults};
