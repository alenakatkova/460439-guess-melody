/**
 * В модуль импортируется функция, создающая DOM-элемент и принимающая на вход разметку в виде строки
 * @exports DOM-элемент, созданный с помощью функции getElement, принимающей на вход строку (разметку)
 */

import getElement from '../functions/get-element';
import initializeReplay from '../functions/replay';

const markup = `<section class="main main--result" id="attempts-out">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Какая жалость!</h2>
    <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
  </section>`;

const attemptsScreen = getElement(markup);

initializeReplay(attemptsScreen);

export default attemptsScreen;
