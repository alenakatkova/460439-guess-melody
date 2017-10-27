/**
 * Модуль создает DOM-элемент экрана с вопросом типа `genre` и добавляет click-listener к кнопке `Ответить`
 * @exports - функция создания экрана
 */

import getElement from '../functions/get-element';
import getHeader from '../markup-parts/get-header';
import showNextQuestion from '../functions/show-next-question';
import Answer from '../data/answer';
import renderScreen from '../functions/render-screen';

/**
 * Функция создает экран игры с вопросом типа `genre` и добавляет click-listener к кнопке `Ответить`
 * о умолчанию кнопка `Ответить` отключена и включается, когда выбран хотя бы один вариант ответа
 * @param {Object} question - объект вопроса вида: {
 * @param {Object} question.audioLink: {String}, - ссылка на песню
 * @param {Object} question.amountOfCorrectAnswers: {Number}, - количество композиций с целевым жанром
 * @param {Object} question.options: Set(3), - 3 объекта с информацией о песнях
 * @param {Object} question.target: {Object}, - рандомная песня из options, исполнителя которой надо определить
 * @param {Object} question.task: {String}, - текст задания
 * @param {Object} question.type: {String} - тип вопроса `artist`
 * @return {Node} genreScreen - DOM-элемент экрана
 */

const showGenreScreen = (question) => {

  /**
   * Части разметки экрана
   */

  const answers = [...question.options].map((option, index) => {
    return `<div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio src="${option.src}"></audio>
              <button class="player-control player-control--pause"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-${index}" id="a-${index}" data-genre="${option.genre}" data-src="${option.src}">
          <label class="genre-answer-check" for="a-${index}"></label>
        </div>`;
  }).join(``);

  const task = `<div class="main-wrap">
      <h2 class="title">${question.task}</h2>
      <form class="genre">
        ${answers}
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>`;

  /**
   * Разметка экрана и создание из нее DOM-элемента
   */

  const markup = `<section class="main main--level main--level-genre" id="genre">
    ${getHeader()}
    ${task}
  </section>`;

  const genreScreen = getElement(markup);

  const answerBtn = genreScreen.querySelector(`.genre-answer-send`);
  answerBtn.disabled = true;
  const checkboxes = [...genreScreen.querySelectorAll(`input[type=checkbox]`)];

  /**
   * Функция отключает кнопку "Ответить" в случае, если ни один из ответов не выбран
   */

  const onAnswerClick = () => {
    answerBtn.disabled = !checkboxes.some((checkbox) => {
      return checkbox.checked;
    });
  };

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener(`click`, onAnswerClick);
  });

  /**
   * Функция снимает галочки с чекбоксов
   */

  const resetForm = () => checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
    answerBtn.disabled = true;
  });

  /**
   * Функция определяет действия для события 'click' на элементе playBtn:
   * - запись ответа игрока
   * - сбрасываение полей формы
   * - переход к следующему вопросу
   * @param {Object} evt
   */

  const onAnswerBtnClick = (evt) => {
    evt.preventDefault();

    /**
     * Получение массива ответов игрока и массива ссылок на выбранные им композиции
     */

    const checkedCheckboxes = checkboxes.filter((checkbox) => {
      return checkbox.checked === true;
    });

    const playersAnswers = checkedCheckboxes.map((checkbox) => {
      return checkbox.dataset.genre;
    });

    const audioLinks = checkedCheckboxes.map((checkbox) => {
      return checkbox.dataset.src;
    });

    /**
     * Функция определяет, является ли выбранный игроком ответ правильным
     * @returns {boolean}
     */

    const isAnswerCorrect = () => {
      return playersAnswers.length === question.amountOfCorrectAnswers && playersAnswers.every((it) => {
        return it === question.target;
      });
    };

    question.playersAnswer = new Answer(isAnswerCorrect(), 30, audioLinks);

    resetForm();
    showNextQuestion();
  };

  answerBtn.addEventListener(`click`, onAnswerBtnClick);

  return renderScreen(genreScreen);
};

export default showGenreScreen;
