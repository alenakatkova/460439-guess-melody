/**
 * Модуль создает DOM-элемент стартового экрана игры и добавляет click-listener к кнопке запуска игры
 * @exports DOM-элемент стартового экрана игры
 */

import getElement from '../functions/get-element';
import artistScreen from './artist';
import renderScreen from '../functions/render-screen';

/**
 * Разметка стартового экрана
 */

const markup = `<section class="main main--welcome" id="start">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
      Ошибиться можно 3 раза.<br>
      Удачи!
    </p>
  </section>`;

const startScreen = getElement(markup);
const playBtn = startScreen.querySelector(`.main-play`);

/**
 * Функция определяет действия для события 'click' на элементе playBtn
 * @param {Object} evt
 */

const onPlayBtnClick = (evt) => {
  evt.preventDefault();
  renderScreen(artistScreen);
};

playBtn.addEventListener(`click`, onPlayBtnClick);

export default startScreen;
