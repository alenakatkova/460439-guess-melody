import winScreen from '../screens/win';
import renderScreen from './render-screen';
import {initialState} from '../data/game-data';
import showArtistScreen from '../screens/artist';
import showGenreScreen from '../screens/genre';
import attemptsScreen from '../screens/attempts-out';
import {countPoints} from './count-points';

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

const showNextQuestion = () => {
  console.log(state.tasks);
  const playersAnswers = state.tasks.map((qu) => {
    return qu.playersAnswer;
  });

  if (state.currentQuestionIndex > 0 && playersAnswers[state.currentQuestionIndex - 1].isAnswerCorrect === false) {
    state.mistakes += 1;
  }


  if (state.mistakes === 4) {
    renderScreen(attemptsScreen);

    state = Object.assign({}, initialState);

  } else if (state.currentQuestionIndex === 10) {
    state.score = countPoints(playersAnswers, 4 - state.mistakes);
    renderScreen(winScreen);
    resetGameData();
  } else if (state.tasks[state.currentQuestionIndex].type === `artist`) {
    renderScreen(showArtistScreen(state.tasks[state.currentQuestionIndex]));
    state.currentQuestionIndex += 1;
  } else if (state.tasks[state.currentQuestionIndex].type === `genre`) {
    renderScreen(showGenreScreen(state.tasks[state.currentQuestionIndex]));
    state.currentQuestionIndex += 1;
  }
};

export default showNextQuestion;
