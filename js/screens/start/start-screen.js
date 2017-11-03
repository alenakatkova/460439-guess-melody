import StartScreenView from './start-screen-view';
import {initialState} from '../../data/game-data';
import App from '../../application';
import changeView from '../../functions/change-view';

class StartScreen {
  constructor() {
    this.view = new StartScreenView();
  }

  init() {
    this.view.init();
    changeView(this.view.element);
    this.newState = Object.assign({}, initialState);
    this.view.onPlayBtnClick = this.onPlayBtnClick.bind(this);
  }

  onPlayBtnClick() {
    App.showQuestion(this.newState);
  }
}

export default new StartScreen();
