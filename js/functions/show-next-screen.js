import {GameData, initialState, stats} from '../data/game-data';
import showArtistScreen from '../screens/artist-screen';
import showGenreScreen from '../screens/genre-screen';
import countPoints from './count-points';
import showResultScreen from '../screens/result';
import {GameResults, resultScreenContent} from '../data/results';
import showResults from './show-results';
import getResultMarkup from '../markup/get-result-markup';

const showNextScreen = (state) => {
  const tasks = state.tasks;
  state.answers = tasks.map((task) => {
    return task.playersAnswer;
  });

  console.log(state.answers);
  /**
   * Функция считает полученные игроком очки и добавляет их в массив с результатами других игроков
   */

  const addScoreToAllResults = (stateX) => {
    stateX.score = countPoints(stateX.answers, GameData.MAX_ATTEMPTS - stateX.mistakes);
    stats.push(stateX.score);
    return stateX;
  };

  /**
   * Функция сбрасывает статистику игры
   */

  const resetGameData = (currentState) => {
    currentState = Object.assign({}, initialState);
    for (let i = 0; i < 10; i++) {
      tasks[i].playersAnswer = null;
    }
    return currentState;
  };

  if (state.mistakes === 4) {
    state = addScoreToAllResults(state);
    const game = new GameResults(state.score, 4, 250);

    const resultScreenMarkup = getResultMarkup(`attemptsOut`, showResults(stats, game));
    showResultScreen(resultScreenMarkup);

    resetGameData(state);

  } else if (state.currentQuestionIndex === 10) {
    state = addScoreToAllResults(state);
    const game = new GameResults(state.score, 0, 250);

    const resultScreenMarkup = getResultMarkup(`win`, resultScreenContent.win.message1(5, 0, 13, 1, 1), showResults(stats, game));
    showResultScreen(resultScreenMarkup);

    resetGameData(state);

  } else if (tasks[state.currentQuestionIndex].type === `artist`) {
    showArtistScreen(state);

  } else if (tasks[state.currentQuestionIndex].type === `genre`) {
    showGenreScreen(state);
  }
};

export default showNextScreen;
