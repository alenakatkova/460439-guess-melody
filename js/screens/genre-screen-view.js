import AbstractView from '../abstract-view';
import getScreenMarkup from '../markup/get-question-markup';
import getTaskMarkup from '../markup/get-task-markup';
import getAnswersMarkup from '../markup/get-answers-markup';

export default class GenreScreenView extends AbstractView {
  constructor(type, options, link, question, mistakes, time) {
    super();

    this._type = type;
    this._options = options;
    this._link = link;
    this._question = question;
    this._mistakes = mistakes;
    this._time = time;

    this._answers = getAnswersMarkup(this._type, this._options);
    this._task = getTaskMarkup(this._type, this._question, this._answers, this._link);

    this.answerBtn = this.element.querySelector(`.genre-answer-send`);
    this.checkboxes = [...this.element.querySelectorAll(`input[type=checkbox]`)];
  }

  get template() {
    return getScreenMarkup(this._task, this._type, this._mistakes, this._time);
  }

  bind() {
    this.minutes = this.element.querySelector(`.timer-value-mins`);
    this.seconds = this.element.querySelector(`.timer-value-secs`);

    const answerBtn = this.element.querySelector(`.genre-answer-send`);
    answerBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onAnswerBtnClick(evt);
    });

    const checkboxes = [...this.element.querySelectorAll(`input[type=checkbox]`)];
    checkboxes.forEach((checkbox) => {

      checkbox.addEventListener(`click`, () => {
        this.onAnswerClick();
      });
    });
  }

  onAnswerClick() {

  }

  onAnswerBtnClick() {

  }

  updateTime(timeLeft) {
    this.minutes.textContent = Math.floor(timeLeft / 60);
    this.seconds.textContent = (timeLeft % 60) > 9 ? (timeLeft % 60) : `0` + (timeLeft % 60);
  }
}
