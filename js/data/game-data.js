/**
 * @export
 * {Object} GameData структура данных, описывающих игру
 * {Object} InitialState структура данных, описывающих начальное состояние игры
 * {Array} stats массив с результатами прошлых игр для тестирования игры
 */

import getQuestions from '../data/question';

const GameData = {
  QUESTIONS_TYPES: [`artist`, `genre`],
  AMOUNT_OF_QUESTIONS: 10,
  MAX_ATTEMPTS: 4,
  MAX_TIME: 300,
  QUICK_TIME: 30,
  counting: {
    LOST_POINTS: 2,
    MIN_EARNED_POINTS: 1,
    MAX_EARNED_POINTS: 2
  }
};

const initialState = {
  mistakes: 0,
  time: GameData.MAX_TIME,
  currentQuestionIndex: 0,
  answers: [],
  score: 0,
  tasks: getQuestions()
};

let stats = [12, 2, 20, 8];

export {GameData, initialState, stats};
