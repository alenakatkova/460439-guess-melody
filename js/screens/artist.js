/**
 * Модуль создает DOM-элемент экрана с вопросом типа `artist` и добавляет click-listener к кнопкам ответов
 * @exports DOM-элемент экрана с вопросом типа `artist`
 */

import getElement from '../functions/get-element';
import genreScreen from './genre';
import getHeader from '../markup-parts/get-header';
import {question} from '../data/question';
import showNextQuestion from '../functions/show-next-question';

const showArtistQuestion = (question) => {

};

/**
 * Части разметки экрана
 */

const answers = [...question.artist.options].map((option, index) => {
  return `<div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="val-${index}"/>
          <label class="main-answer" for="answer-${index}">
            <img class="main-answer-preview" src="http://placehold.it/134x134"
                 alt="${option.artist}" width="134" height="134">
            ${option.artist}
          </label>
        </div>`;
}).join(``);

const task = `<div class="main-wrap">
      <h2 class="title main-title">${question.artist.task}</h2>
      <div class="player-wrapper">
        <div class="player">
          <audio src="${question.artist.audioLink}"></audio>
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
    showNextQuestion(genreScreen);
  }
};

radioButtons.addEventListener(`click`, onRadioBtnClick);

export default artistScreen;
