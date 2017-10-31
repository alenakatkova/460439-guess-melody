import GenreScreenView from './genre-screen-view';
import showNextScreen from '../functions/show-next-screen';
import showScreen from '../functions/show-screen';
import Answer from '../data/answer';
import getTimer from '../functions/get-timer';

export default (state) => {
  const newState = Object.assign({}, state);
  const question = newState.tasks[newState.currentQuestionIndex];

  const genreScreen = new GenreScreenView(question.type, question.options,
      question.audioLink, question.task, newState.mistakes, newState.time);
  const startTime = newState.time;

  /** Функция запускает таймер обратного отсчета */

  const timer = setInterval(function () {
    if (newState.time === 0) {
      clearInterval(timer);
      showNextScreen(newState);
    }
    const newTime = getTimer(newState.time).tick();
    newState.time = newTime.value;
    genreScreen.updateTime(newState.time);
  }, 1000);

  /** Функция сбрасывает форму */

  const resetForm = () => genreScreen.checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
    genreScreen.answerBtn.disabled = true;
  });

  /**
   * По умолчанию кнопка отправки ответа отключена
   * Она активируется при выборе хотя бы одного чекбокса
   */

  genreScreen.answerBtn.disabled = true;

  genreScreen.onAnswerClick = () => {
    genreScreen.answerBtn.disabled = !genreScreen.checkboxes.some((checkbox) => {
      return checkbox.checked;
    });
  };

  /**
   * Функция формирует объект ответа, сбрасывает форму, обновляет текущее состояние игры и
   * показывает следующий экран (результат или вопрос)
   */

  genreScreen.onAnswerBtnClick = () => {
    clearInterval(timer);

    const checkedCheckboxes = genreScreen.checkboxes.filter((checkbox) => {
      return checkbox.checked === true;
    });

    const playersAnswers = checkedCheckboxes.map((checkbox) => {
      return checkbox.dataset.genre;
    });

    const audioLinks = checkedCheckboxes.map((checkbox) => {
      return checkbox.dataset.src;
    });

    /** Функция определяет, является ли выбранный игроком ответ правильным */

    const isAnswerCorrect = () => {
      return playersAnswers.length === question.amountOfCorrectAnswers && playersAnswers.every((it) => {
        return it === question.target;
      });
    };

    const endTime = newState.time;
    const timeSpent = startTime - endTime;

    question.playersAnswer = new Answer(isAnswerCorrect(), timeSpent, audioLinks);
    newState.currentQuestionIndex += 1;

    if (!isAnswerCorrect()) {
      newState.mistakes += 1;
    }

    resetForm();
    showNextScreen(newState);
  };

  return showScreen(genreScreen.element);
};
