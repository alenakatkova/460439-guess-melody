/**
 * Модуль создает DOM-элемент экрана с вопросом типа `genre` и добавляет click-listener к кнопке `Ответить`
 * @exports - функция создания экрана
 */

import renderElement from '../functions/render-element';
import showNextQuestion from '../functions/show-next-screen';
import Answer from '../data/answer';
import showScreen from '../functions/show-screen';
import getScreenMarkup from '../markup/get-screen-markup';
import getTask from '../markup/get-task';
import getAnswers from '../markup/get-answers';

/**
 * Функция создает экран игры с вопросом типа `genre` и добавляет click-listener к кнопке `Ответить`
 * о умолчанию кнопка `Ответить` отключена и включается, когда выбран хотя бы один вариант ответа
 * @param {Object} question - объект вопроса вида: {
 * @param {String} question.audioLink - ссылка на песню
 * @param {Number} question.amountOfCorrectAnswers - количество композиций с целевым жанром
 * @param {Set} question.options - 4 объекта с информацией о песнях
 * @param {Object} question.target - рандомная песня из options, жанр которой берем для вопроса
 * @param {String} question.task - текст задания
 * @param {String} question.type - тип вопроса `genre`
 * @return {Node} genreScreen - DOM-элемент экрана
 */

const showGenreScreen = (question) => {

  /**
   * Части разметки экрана
   */

  const answers = getAnswers(question.type, question.options);
  const task = getTask(question.type, question.task, answers);

  /**
   * Разметка экрана и создание из нее DOM-элемента
   */

  const markup = getScreenMarkup(task, question.type);
  const genreScreen = renderElement(markup);

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

  return showScreen(genreScreen);
};

export default showGenreScreen;
