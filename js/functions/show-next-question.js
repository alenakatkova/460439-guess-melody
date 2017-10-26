//import timeoutScreen from '../screens/timeout';
import winScreen from '../screens/win';
//import attemptsScreen from '../screens/attempts-out';
import renderScreen from './render-screen';
import {initialState} from '../data/game-data';
import questions from '../data/question';
import showArtistScreen from '../screens/artist';
import showGenreScreen from '../screens/genre';


let state = Object.assign({}, initialState);

const showNextQuestion = () => {
  if (state.questionNumber === 10) {
    renderScreen(winScreen);
  } else if (questions[state.questionNumber].type === `artist`) {
    renderScreen(showArtistScreen(questions[state.questionNumber]));
    //console.log(questions[state.questionNumber].correctAnswer);
  } else if (questions[state.questionNumber].type === `genre`) {
    renderScreen(showGenreScreen(questions[state.questionNumber]));
    //console.log(questions[state.questionNumber].correctAnswer);
  }

  state.questionNumber += 1;
  //console.log(state);

  // здесь нужно в массив ответов запушить новый ответ
  // if (currentState.mistakes === 0) {
  //   renderScreen(attemptsScreen);
  // } else if (currentState.time === 0) {
  //   renderScreen(timeoutScreen);
  // } else

};

export default showNextQuestion;
