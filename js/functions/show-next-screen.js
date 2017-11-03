import {GameData, tasks, initialState, stats} from '../data/game-data';
import countPoints from './count-points';
import {GameResults} from '../data/results';
import App from '../application';

/**
 * Функция переключает экраны игры
 * @param {Object} state - текущее состояние игры со всеми данными
 */

const showNextScreen = (state) => {
  state.answers = tasks.map((task) => {
    return task.playersAnswer;
  });

  /** Функция считает полученные игроком очки и добавляет их в массив с результатами других игроков */

  const addScoreToAllResults = (lastState) => {
    lastState.score = countPoints(lastState.answers, GameData.MAX_ATTEMPTS - lastState.mistakes);
    stats.push(lastState.score);
    return lastState;
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
   * @param {Object} lastState
   */

  const endGame = (lastState) => {
    lastState = addScoreToAllResults(lastState);
    lastState.gameResult = new GameResults(lastState.score, lastState.mistakes, lastState.time);
    App.showResult(lastState);
    resetGameData(lastState);
  };

  /** Опеределям, какой экран будет показан следующим */

  if (state.mistakes === GameData.MAX_ATTEMPTS) {
    state.typeOfResult = `attemptsOut`;
    endGame(state);

  } else if (state.time === 0) {
    state.typeOfResult = `timeOut`;
    endGame(state);

  } else if (state.currentQuestionIndex === 10) {
    state.typeOfResult = `win`;
    endGame(state);

  } else {
    App.showQuestion(state);
  }
};

export default showNextScreen;
