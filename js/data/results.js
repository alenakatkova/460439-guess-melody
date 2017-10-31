/**
 * @export
 * - {Object} resultScreenContent - контент для экранов результатов трех типов (win, attemptsOt, timeOut)
 * - функция-конструктор объекта резальтутов игры
 */

import {GameData} from './game-data';

const resultScreenContent = {
  win: {
    title: `Вы настоящий меломан!`,
    message1: (min, sec, score, quickScore, mistakes) => {
      return `За ${min} минуты и ${sec} секунд<br>вы набрали ${score} баллов (${quickScore} быстрых),<br>совершив ${mistakes} ошибки`;
    },
    message2: (place, amountOfPlayers, worseResults) => {
      return `Вы заняли ${place}-ое место из ${amountOfPlayers} игроков. Это лучше чем у ${worseResults}% игроков`;
    },
    button: `Сыграть ещё раз`
  },
  attemptsOut: {
    title: `Какая жалость!`,
    message: `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`,
    button: `Попробовать ещё раз`
  },
  timeOut: {
    title: `Увы и ах!`,
    message: `Время вышло!<br>Вы не успели отгадать все мелодии`,
    button: `Попробовать ещё раз`
  }
};

/**
 * Функция создает объект с результатами последней игры
 * @param {Number} playersScore
 * @param {Number} mistakesMade
 * @param {Number} timeLeft
 * @constructor
 */

const GameResults = function (playersScore, mistakesMade, timeLeft) {
  this.score = playersScore;
  this.attemptsLeft = GameData.MAX_ATTEMPTS - mistakesMade;
  this.time = timeLeft;
};

export {resultScreenContent, GameResults};
