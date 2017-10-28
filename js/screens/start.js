/**
 * Модуль создает DOM-элемент стартового экрана игры и добавляет click-listener к кнопке запуска игры
 * @exports DOM-элемент стартового экрана игры
 */

import renderElement from '../functions/render-element';
import showNextQuestion from '../functions/show-next-screen';
import showScreen from '../functions/show-screen';
import startScreenMarkup from '../markup/start-screen-markup';

const showStartScreen = () => {
  const startScreen = renderElement(startScreenMarkup);
  const playBtn = startScreen.querySelector(`.main-play`);

  /**
   * Функция определяет действия для события 'click' на элементе playBtn
   * @param {Object} evt
   */

  const onPlayBtnClick = (evt) => {
    evt.preventDefault();
    showNextQuestion();
  };

  playBtn.addEventListener(`click`, onPlayBtnClick);

  return showScreen(startScreen);
};

export default showStartScreen;
