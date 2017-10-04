/**
 * В модуль импортируется функция, создающая DOM-элемент и принимающая на вход разметку в виде строки
 * @exports DOM-элемент, созданный с помощью функции getElement, принимающей на вход строку (разметку)
 */

import getElement from '../functions/get-element';
import initializeReplay from '../functions/replay';


const markup = `<section class="main main--result" id="timeout">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Увы и ах!</h2>
    <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
  </section>`;

const timeoutScreen = getElement(markup);

initializeReplay(timeoutScreen);

export default timeoutScreen;
