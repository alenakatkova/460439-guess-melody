//import timeoutScreen from '../screens/timeout';
import winScreen from '../screens/win';
//import attemptsScreen from '../screens/attempts-out';
import renderScreen from './render-screen';
import {gameData, initialState} from '../data/game-data';


let state = Object.assign({}, initialState);

const showNextQuestion = (gameScreen) => {
  state.questionsAnswered += 1;
  console.log(state);

  // здесь нужно в массив ответов запушить новый ответ
  // if (currentState.mistakes === 0) {
  //   renderScreen(attemptsScreen);
  // } else if (currentState.time === 0) {
  //   renderScreen(timeoutScreen);
  // } else
  if (state.questionsAnswered === 10) {
    renderScreen(winScreen);
  } else {
    renderScreen(gameScreen);
  }
};

export default showNextQuestion;
