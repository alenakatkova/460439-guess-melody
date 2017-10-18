/**
 * Структура данных, описывающих игру
 */

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
  // questionType: gameData.questionsTypes[0],
  questionNumber: 0,
  answers: [],
  score: 0
};

export {gameData, initialState};
