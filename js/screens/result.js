import renderElement from '../functions/render-element';
import startScreen from '../screens/start-screen';
import showScreen from '../functions/show-screen';

const showResultScreen = (markup) => {
  const resultScreen = renderElement(markup);

  /**
   * Добавление взаимодействия пользователя с экраном
   */

  const initializeReplay = (screen) => {
    const replayBtn = screen.querySelector(`.main-replay`);
    const onReplayBtnClick = () => {
      showScreen(startScreen());
    };
    replayBtn.addEventListener(`click`, onReplayBtnClick);
  };

  initializeReplay(resultScreen);

  return showScreen(resultScreen);
};

export default showResultScreen;
