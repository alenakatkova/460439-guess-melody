/**
 * Модуль создает DOM-элемент экрана с вопросом типа `artist`
 * @exports - функция создания экрана
 */

import getElement from '../functions/get-element';
import getHeader from '../markup-parts/get-header';
import showNextQuestion from '../functions/show-next-question';
import Answer from '../data/answer';

/**
 * Функция создает экран игры с вопросом типа `artist` и добавляет обработчик события `click`
 * к радио-кнопкам с вариантами ответов. После выбора ответа отрисовывается следующий экран (результат или вопрос)
 * @param {Object} question - объект вопроса вида {
 * audioLink: {String}, - ссылка на песню
 * correctAnswer: {String}, - правильный ответ - имя исполнителя
 * options: Set(3), - 3 объекта с информацией о песнях
 * target: {Object}, - рандомная песня из options, исполнителя которой надо определить
 * task: {String}, - текст задания
 * type: {String} - тип вопроса `artist`
 * }
 * @returns {Node} artistScreen - DOM-элемент экрана
 */

const showArtistScreen = (question) => {

  /**
   * Части разметки экрана
   */

  const answers = [...question.options].map((option, index) => {
    return `<div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="val-${index}"/>
          <label class="main-answer" for="answer-${index}">
            <img class="main-answer-preview" src="http://placehold.it/134x134"
                 alt="${option.artist}" data-link="${option.src}" width="134" height="134">
            ${option.artist}
          </label>
        </div>`;
  }).join(``);

  const task = `<div class="main-wrap">
      <h2 class="title main-title">${question.task}</h2>
      <div class="player-wrapper">
        <div class="player">
          <audio src="${question.audioLink}"></audio>
          <button class="player-control player-control--pause"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <form class="main-list">
        ${answers}
      </form>
    </div>`;

  /**
   * Разметка экрана и создание из нее DOM-элемента
   */

  const markup = `<section class="main main--level main--level-artist" id="artist">
    ${getHeader()}
    ${task}
  </section>`;

  const artistScreen = getElement(markup);

  /**
   * Функция определяет действие для события 'click' на элементах с классом .main-answer-preview
   */

  const radioButtons = artistScreen.querySelector(`.main-list`);

  const onRadioBtnClick = (evt) => {
    evt.preventDefault();
    if (evt.target.className === `main-answer-preview`) {

      /**
       * Функция определяет, является ли выбранный игроком ответ правильным
       * @returns {boolean}
       */

      const isAnswerCorrect = () => {
        return evt.target.alt === question.correctAnswer;
      };

      const answer = new Answer(isAnswerCorrect(), 30, evt.target.dataset.link);
      console.log(answer);
      showNextQuestion();
    }
  };

  radioButtons.addEventListener(`click`, onRadioBtnClick);

  return artistScreen;
};

export default showArtistScreen;
