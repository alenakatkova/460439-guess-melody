import StartScreenView from './start-screen-view';
import {initialState} from '../data/game-data';
import showArtistScreen from '../screens/artist-screen';

const startGame = () => {
  const newState = Object.assign({}, initialState);
  showArtistScreen(newState);
};

export default () => {
  const startScreen = new StartScreenView();

  startScreen.onPlayBtnClick = () => {
    startGame();
  };

  return startScreen.element;
};
