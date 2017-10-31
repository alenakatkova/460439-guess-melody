import StartScreenView from './start-screen-view';
import {initialState} from '../data/game-data';
import showQuestionScreen from '../screens/question-screen';

const startGame = () => {
  const newState = Object.assign({}, initialState);
  showQuestionScreen(newState);
};

export default () => {
  const startScreen = new StartScreenView();

  startScreen.onPlayBtnClick = () => {
    startGame();
  };

  return startScreen.element;
};
