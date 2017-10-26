import renderScreen from './render-screen';
import {initialState, stats} from '../data/game-data';
import showArtistScreen from '../screens/artist';
import showGenreScreen from '../screens/genre';
import {countPoints} from './count-points';
import showResultScreen from '../screens/result';
import {GameResults, resultScreenContent} from '../data/results';
import { showResults } from './show-results'

let state;

/**
 *
 */

const resetGameData = () => {
  state = Object.assign({}, initialState);
};

resetGameData();

/**
 *
 */

const showNextScreen = () => {
  const playersAnswers = state.tasks.map((qu) => {
    return qu.playersAnswer;
  });

  if (state.currentQuestionIndex > 0 && playersAnswers[state.currentQuestionIndex - 1].isAnswerCorrect === false) {
    state.mistakes += 1;
  }

  if (state.mistakes === 4) {
    state = Object.assign({}, initialState);
    state.score = countPoints(playersAnswers, 0);
    const game = new GameResults(state.score, 4, 250);
    stats.push(state.score);
    renderScreen(showResultScreen(resultScreenContent.attemptsOut.title, showResults(stats, game), ``, resultScreenContent.attemptsOut.button));
  } else if (state.currentQuestionIndex === 10) {
    state.score = countPoints(playersAnswers, 4 - state.mistakes);
    const game = new GameResults(state.score, 0, 250);
    stats.push(state.score);
    renderScreen(showResultScreen(resultScreenContent.win.title, resultScreenContent.win.message1(5, 0, 13, 1, 1), showResults(stats, game), resultScreenContent.win.button));
    resetGameData();
  } else if (state.tasks[state.currentQuestionIndex].type === `artist`) {
    renderScreen(showArtistScreen(state.tasks[state.currentQuestionIndex]));
    state.currentQuestionIndex += 1;
  } else if (state.tasks[state.currentQuestionIndex].type === `genre`) {
    renderScreen(showGenreScreen(state.tasks[state.currentQuestionIndex]));
    state.currentQuestionIndex += 1;
  }
};

export default showNextScreen;
