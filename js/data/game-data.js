/**
 * Структура данных, описывающих игру
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

/**
 * Структура данных, описывающих начальное состояние в игре
 */

const initialState = {
  mistakes: 0,
  time: GameData.MAX_TIME,
  currentQuestionIndex: 0,
  answers: [],
  score: 0,
  tasks: getQuestions()
};

/**
 * Статистика прошлых игр
 */

let stats = [12, 2, 20, 8];

export {GameData, initialState, stats};
