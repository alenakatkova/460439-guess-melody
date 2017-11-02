import {GameData, initialState, stats} from '../data/game-data';
import countPoints from './count-points';
import {GameResults} from '../data/results';
import App from '../application';

/**
 * Функция переключает экраны игры
 * @param {Object} state - текущее состояние игры со всеми данными
 */

const showNextScreen = (state) => {
  const tasks = state.tasks;
  state.answers = tasks.map((task) => {
    return task.playersAnswer;
  });

  /** Функция считает полученные игроком очки и добавляет их в массив с результатами других игроков */

  const addScoreToAllResults = (latState) => {
    latState.score = countPoints(latState.answers, GameData.MAX_ATTEMPTS - latState.mistakes);
    stats.push(latState.score);
    return latState;
  };

  /** Функция сбрасывает статистику игры */

  const resetGameData = (currentState) => {
    currentState = Object.assign({}, initialState);
    for (let i = 0; i < 10; i++) {
      tasks[i].playersAnswer = null;
    }
    return currentState;
  };

  /**
   * Функция заканчивает игру: сохраняет набранные очки, генерирует объект с результатами игры,
   * показывает экран результата и обнуляет состояние игры
   * @param typeOfResult
   */

  const endGame = (typeOfResult) => {
    state = addScoreToAllResults(state);
    const game = new GameResults(state.score, state.mistakes, state.time);
    App.showResult(typeOfResult, state, game);
    resetGameData(state);
  };

  /** Опеределям, какой экран будет показан следующим */

  if (state.mistakes === GameData.MAX_ATTEMPTS) {
    endGame(`attemptsOut`);

  } else if (state.time === 0) {
    endGame(`timeOut`);

  } else if (state.currentQuestionIndex === 10) {
    endGame(`win`);

  } else {
    App.showQuestion(state);
  }
};

export default showNextScreen;
