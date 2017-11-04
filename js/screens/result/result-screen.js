import ResultScreenView from './result-screen-view';
import changeView from '../../functions/change-view';
import generateFinishMessage from '../../functions/generate-finish-message';
import {GameData} from '../../data/game-data';
import {resultScreenContent} from '../../data/results';
import App from '../../application';

class ResultScreen {
  constructor() {
    this.view = new ResultScreenView();
  }

  /**
   * Метод формирует и показывает экран с результатами игры
   * @param state
   */

  init(state) {
    const finishState = Object.assign({}, state);
    const lastGameResults = Object.assign({}, state.gameResult);

    let extraMessage;
    if (state.typeOfResult === `win`) {
      const quickAnswers = finishState.answers.filter((answer) => {
        return answer.time < GameData.QUICK_TIME;
      });

      extraMessage = resultScreenContent.win.message1(Math.floor((GameData.MAX_TIME - finishState.time) / 60),
          (GameData.MAX_TIME - finishState.time) % 60, finishState.score, quickAnswers.length, finishState.mistakes);
    } else {
      extraMessage = ``;
    }

    const mainMessage = generateFinishMessage(finishState.stats, lastGameResults);

    this.view.init(state.typeOfResult, mainMessage, extraMessage);
    changeView(this.view.element);

    this.view.onReplayBtnClick = this.onReplayBtnClick.bind(this);
  }

  onReplayBtnClick() {
    App.showWelcome();
  }
}

export default new ResultScreen();
