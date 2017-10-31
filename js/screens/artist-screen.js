import ArtistScreenView from './artist-screen-view';
import showNextScreen from '../functions/show-next-screen';
import showScreen from '../functions/show-screen';
import Answer from '../data/answer';
import getTimer from '../functions/get-timer';

export default (state) => {
  const newState = Object.assign({}, state);
  const question = newState.tasks[newState.currentQuestionIndex];

  const artistScreen = new ArtistScreenView(question.type, question.options,
      question.audioLink, question.task, newState.mistakes, newState.time);
  const startTime = newState.time;

  /**
   * Функция запускает таймер обратного отсчета
   */

  const timer = setInterval(function () {
    if (newState.time === 0) {
      clearInterval(timer);
      showNextScreen(newState);
    }
    const newTime = getTimer(newState.time).tick();
    newState.time = newTime.value;
    artistScreen.updateTime(newState.time);
  }, 1000);

  /**
   * Функция определяет действие для события "клик" на радио-инпутах:
   * - формируется ответ пользователя
   * - включается следующий экран (с вопросом или результатом)
   * @param evt
   */

  artistScreen.onRadioBtnClick = (evt) => {
    if (evt.target.className === `main-answer-preview`) {
      clearInterval(timer);

      /**
       * Функция определяет, является ли выбранный игроком ответ правильным
       * @returns {boolean}
       */

      const isAnswerCorrect = () => {
        return evt.target.alt === question.correctAnswer;
      };

      const endTime = newState.time;
      const timeSpent = startTime - endTime;

      question.playersAnswer = new Answer(isAnswerCorrect(), timeSpent, evt.target.dataset.link);
      newState.currentQuestionIndex += 1;

      if (!isAnswerCorrect()) {
        newState.mistakes += 1;
      }

      showNextScreen(newState);
    }
  };

  return showScreen(artistScreen.element);
};
