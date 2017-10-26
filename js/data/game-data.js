/**
 * Структура данных, описывающих игру
 */

import questions from '../data/question';

const gameData = {
  questionsTypes: [`artist`, `genre`],
  amountOfQuestions: 10,
  maxMistakes: 4,
  time: 300
};

/**
 * Структура данных, описывающих начальное состояние в игре
 */

const initialState = {
  mistakes: 0,
  time: gameData.time,
  currentQuestionIndex: 0,
  answers: [],
  score: 0,
  tasks: questions
};

export {gameData, initialState};
