import showNextScreen from '../functions/show-next-screen';
import showScreen from '../functions/show-screen';
import Answer from '../data/answer';
import getTimer from '../functions/get-timer';
import QuestionScreenView from './question-screen-view';

export default (state) => {
  const newState = Object.assign({}, state);
  const question = newState.tasks[newState.currentQuestionIndex];

  const questionScreen = new QuestionScreenView(question.type, question.options,
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
    questionScreen.updateTime(newState.time);
  }, 1000);

  if (question.type === `genre`) {
    questionScreen.answerBtn.disabled = true;

    questionScreen.onAnswerClick = () => {
      questionScreen.answerBtn.disabled = !questionScreen.checkboxes.some((checkbox) => {
        return checkbox.checked;
      });
    };
  }

  questionScreen.onSendAnswerBtnClick = (evt) => {
    let isAnswerCorrect;
    let audio;

    if (question.type === `artist`) {
      if (evt.target.className === `main-answer-preview`) {
        clearInterval(timer);
        isAnswerCorrect = () => {
          return evt.target.alt === question.correctAnswer;
        };
        audio = evt.target.dataset.link;
      }
    } else if (question.type === `genre`) {
      clearInterval(timer);

      const checkedCheckboxes = questionScreen.checkboxes.filter((checkbox) => {
        return checkbox.checked === true;
      });

      const playersAnswers = checkedCheckboxes.map((checkbox) => {
        return checkbox.dataset.genre;
      });

      audio = checkedCheckboxes.map((checkbox) => {
        return checkbox.dataset.src;
      });

      isAnswerCorrect = () => {
        return playersAnswers.length === question.amountOfCorrectAnswers && playersAnswers.every((it) => {
          return it === question.target;
        });
      };
    }

    const endTime = newState.time;
    const timeSpent = startTime - endTime;

    question.playersAnswer = new Answer(isAnswerCorrect(), timeSpent, audio);
    newState.currentQuestionIndex += 1;

    if (!isAnswerCorrect()) {
      newState.mistakes += 1;
    }

    if (question.type === `genre`) {
      questionScreen.checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
        questionScreen.answerBtn.disabled = true;
      });
    }

    showNextScreen(newState);
  };

  return showScreen(questionScreen.element);
};
