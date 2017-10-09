/**
 * В модуль импортируется функция, создающая DOM-элемент и принимающая на вход разметку в виде строки
 * @exports DOM-элемент, созданный с помощью функции getElement, принимающей на вход строку (разметку)
 */

import getElement from '../functions/get-element';
import renderScreen from '../functions/render-screen';
import timeoutScreen from './timeout';
import winScreen from './win';
import attemptsScreen from './attempts-out';
import {getRandomInteger} from '../util';

const results = [winScreen, timeoutScreen, attemptsScreen];

const markup = `<section class="main main--level main--level-genre" id="genre">
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">05</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">00</span>
      </div>
    </svg>
    <div class="main-mistakes">
      <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
      <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
      <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
    </div>

    <div class="main-wrap">
      <h2 class="title">Выберите инди-рок треки</h2>
      <form class="genre">
        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--pause"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-1">
          <label class="genre-answer-check" for="a-1"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-2">
          <label class="genre-answer-check" for="a-2"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-3">
          <label class="genre-answer-check" for="a-3"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-4">
          <label class="genre-answer-check" for="a-4"></label>
        </div>

        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  </section>`;

const genreScreen = getElement(markup);
const answerBtn = genreScreen.querySelector(`.genre-answer-send`);
answerBtn.disabled = true;
const answers = [...genreScreen.querySelectorAll(`input[type=checkbox]`)];

/**
 * Функция отключает кнопку "Ответить" в случае, если ни один из ответов не выбран
 */

const onAnswerClick = () => {
  answerBtn.disabled = !answers.some((answer) => {
    return answer.checked;
  });
};

answers.forEach((answer) => {
  answer.addEventListener(`click`, onAnswerClick);
});

/**
 * Функция снимает галочки с чекбоксов
 */

const resetForm = () => answers.forEach((answer) => {
  answer.checked = false;
});

/**
 * Функция определяет действия для события 'click' на элементе playBtn:
 * - сбрасываение полей формы
 * - открытие экрана результатов
 * @param {Object} evt
 */

const onAnswerBtnClick = (evt) => {
  evt.preventDefault();
  resetForm();
  renderScreen(results[getRandomInteger(0, results.length - 1)]);
};

answerBtn.addEventListener(`click`, onAnswerBtnClick);

export default genreScreen;
