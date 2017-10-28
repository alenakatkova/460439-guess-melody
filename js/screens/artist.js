/**
 * Модуль создает DOM-элемент экрана с вопросом типа `artist`
 * @exports - функция создания экрана
 */

import renderElement from '../functions/render-element';
import showNextScreen from '../functions/show-next-screen';
import Answer from '../data/answer';
import showScreen from '../functions/show-screen';
import getScreenMarkup from '../markup/get-screen-markup';
import getTask from '../markup/get-task';
import getAnswers from '../markup/get-answers';

/**
 * Функция создает экран игры с вопросом типа `artist` и добавляет обработчик события `click`
 * к радио-кнопкам с вариантами ответов. После выбора ответа отрисовывается следующий экран (результат или вопрос)
 * @param {Object} question - объект вопроса вида
 * @param {String} question.audioLink - ссылка на песню
 * @param {Set} question.options - 3 объекта с информацией о песнях
 * @param {String} question.correctAnswer - правильный ответ - имя исполнителя
 * @param {Object} question.target - рандомная песня из options, исполнителя которой надо определить
 * @param {String} question.task - текст задания
 * @param {String} question.type - тип вопроса `artist`
 * @return {Node} genreScreen - DOM-элемент экрана
 */

const showArtistScreen = (question) => {

  /**
   * Части разметки экрана
   */

  const answers = getAnswers(question.type, question.options);
  const task = getTask(question.type, question.task, answers, question.audioLink);

  /**
   * Разметка экрана и создание из нее DOM-элемента
   */

  const markup = getScreenMarkup(task, question.type);
  const artistScreen = renderElement(markup);

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

      question.playersAnswer = new Answer(isAnswerCorrect(), 30, evt.target.dataset.link);

      showNextScreen();
    }
  };

  radioButtons.addEventListener(`click`, onRadioBtnClick);

  return showScreen(artistScreen);
};

export default showArtistScreen;
