import AbstractView from '../abstract-view';
import getScreenMarkup from '../markup/get-screen-markup';
import getTask from '../markup/get-task';
import getAnswers from '../markup/get-answers';

export default class ArtistScreenView extends AbstractView {
  constructor(type, options, link, question) {
    super();
    this._type = type;
    this._options = options;
    this._link = link;
    this._question = question;

    this._answers = getAnswers(this._type, this._options);
    this._task = getTask(this._type, this._question, this._answers, this._link);
  }

  get template() {
    return getScreenMarkup(this._task, this._type);
  }

  bind() {
    const radioButtons = this.element.querySelector(`.main-list`);
    radioButtons.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onRadioBtnClick(evt);
    });
  }

  onRadioBtnClick() {

  }
}
