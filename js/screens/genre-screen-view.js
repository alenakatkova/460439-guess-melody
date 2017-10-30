import AbstractView from '../abstract-view';
import getScreenMarkup from '../markup/get-screen-markup';
import getTask from '../markup/get-task';
import getAnswers from '../markup/get-answers';

export default class GenreScreenView extends AbstractView {
  constructor(type, options, link, question, mistakes) {
    super();
    this._type = type;
    this._options = options;
    this._link = link;
    this._question = question;
    this._mistakes = mistakes;

    this._answers = getAnswers(this._type, this._options);
    this._task = getTask(this._type, this._question, this._answers, this._link);

    this.answerBtn = this.element.querySelector(`.genre-answer-send`);
    this.checkboxes = [...this.element.querySelectorAll(`input[type=checkbox]`)];
  }

  get template() {
    return getScreenMarkup(this._task, this._type, this._mistakes);
  }

  bind() {
    const answerBtn = this.element.querySelector(`.genre-answer-send`);
    answerBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onAnswerBtnClick(evt);
    });

    const checkboxes = [...this.element.querySelectorAll(`input[type=checkbox]`)];
    checkboxes.forEach((checkbox) => {

      checkbox.addEventListener(`click`, () => {
        this.onAnswerClick()});
    });
  }

  onAnswerClick() {

  }

  onAnswerBtnClick() {

  }
}
