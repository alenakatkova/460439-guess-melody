/**
 * В модуль импортируется функция, создающая DOM-элемент и принимающая на вход разметку в виде строки
 * @exports DOM-элемент, созданный с помощью функции getElement, принимающей на вход строку (разметку)
 */

import getElement from '../functions/get-element';
import artistScreen from './artist';
import renderScreen from '../functions/render-screen';

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
