import ResultScreenView from './result-screen-view';
import changeView from '../../functions/change-view';
import generateFinishMessage from '../../functions/generate-finish-message';
import {GameData, stats} from '../../data/game-data';
import {resultScreenContent} from '../../data/results';
import App from '../../application';

class ResultScreen {
  constructor() {
    this.view = new ResultScreenView();
  }

  /**
   * Метод формирует и показывает экран с результатами игры
   * @param resultType
   * @param state
   * @param gameResults
   */

  init(resultType, state, gameResults) {
    const finishState = Object.assign({}, state);
    const lastGameResults = Object.assign({}, gameResults);

    let extraMessage;
    if (resultType === `win`) {
      const quickAnswers = finishState.answers.filter((answer) => {
        return answer.time < GameData.QUICK_TIME;
      });
      extraMessage = resultScreenContent.win.message1(Math.floor((GameData.MAX_TIME - finishState.time) / 60),
          (GameData.MAX_TIME - finishState.time) % 60, finishState.score, quickAnswers.length, finishState.mistakes);
    } else {
      extraMessage = ``;
    }

    const mainMessage = generateFinishMessage(stats, lastGameResults);

    this.view.init(resultType, mainMessage, extraMessage);
    changeView(this.view.element);

    this.view.onReplayBtnClick = this.onReplayBtnClick.bind(this);
  }

  onReplayBtnClick() {
    App.showWelcome();
  }
}

export default new ResultScreen();
