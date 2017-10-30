import GenreScreenView from './genre-screen-view';
import showNextScreen from '../functions/show-next-screen';
import showScreen from '../functions/show-screen';

import Answer from '../data/answer';

export default (state) => {
  const newState = Object.assign({}, state);
  const question = newState.tasks[newState.currentQuestionIndex];

  const genreScreen = new GenreScreenView(question.type, question.options, question.audioLink, question.task);

  const resetForm = () => genreScreen.checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
    genreScreen.answerBtn.disabled = true;
  });

  genreScreen.answerBtn.disabled = true;

  genreScreen.onAnswerClick = () => {
    genreScreen.answerBtn.disabled = !genreScreen.checkboxes.some((checkbox) => {
      return checkbox.checked;
    });
  };

  genreScreen.onAnswerBtnClick = () => {
    const checkedCheckboxes = genreScreen.checkboxes.filter((checkbox) => {
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
    newState.currentQuestionIndex += 1;

    if (!isAnswerCorrect()) {
      newState.mistakes += 1;
    }

    resetForm();
    showNextScreen(newState);
  };

  return showScreen(genreScreen.element);
};
