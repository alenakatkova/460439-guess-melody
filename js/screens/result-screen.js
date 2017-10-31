import ResultScreenView from './result-screen-view';
import startScreen from '../screens/start-screen';
import showScreen from '../functions/show-screen';
import generateFinishMessage from '../functions/generate-finish-message';
import {GameData, stats} from '../data/game-data';
import {resultScreenContent} from '../data/results';

export default (resultType, state, gameResults) => {
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


  const resultScreen = new ResultScreenView(resultType, mainMessage, extraMessage);

  resultScreen.onReplayBtnClick = () => {
    showScreen(startScreen());
  };

  return showScreen(resultScreen.element);
};
