import ArtistScreenView from './artist-screen-view';
import showNextScreen from '../functions/show-next-screen';
import showScreen from '../functions/show-screen';

import Answer from '../data/answer';

export default (state) => {
  const newState = Object.assign({}, state);
  const question = newState.tasks[newState.currentQuestionIndex];

  const artistScreen = new ArtistScreenView(question.type, question.options, question.audioLink, question.task);

  artistScreen.onRadioBtnClick = (evt) => {
    if (evt.target.className === `main-answer-preview`) {

      /**
       * Функция определяет, является ли выбранный игроком ответ правильным
       * @returns {boolean}
       */

      const isAnswerCorrect = () => {
        return evt.target.alt === question.correctAnswer;
      };

      question.playersAnswer = new Answer(isAnswerCorrect(), 30, evt.target.dataset.link);
      newState.currentQuestionIndex += 1;

      if (!isAnswerCorrect()) {
        newState.mistakes += 1;
      }

      showNextScreen(newState);
    }
  };

  return showScreen(artistScreen.element);
};
