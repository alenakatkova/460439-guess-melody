/**
 * @export - функция, добавляющая слушатель события 'click' на кнопку перезагрузки игры
 */

import showStartScreen from '../screens/start';

/**
 * Функция добавляет к кнопке перезагрузки игры слушатель события 'click'
 * При нажатии на кнопку отрисовывается стартовый экран игры
 * @param {Node} screen - блок, в котором находится кнопка перезагрузки
 */

const initializeReplay = (screen) => {
  const replayBtn = screen.querySelector(`.main-replay`);
  const onReplayBtnClick = () => {
    showStartScreen();
  };
  replayBtn.addEventListener(`click`, onReplayBtnClick);
};

export default initializeReplay;
