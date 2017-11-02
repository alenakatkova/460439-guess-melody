import AbstractView from '../../abstract-view';
import getResultMarkup from '../../markup/get-result-markup';

export default class ResultScreenView extends AbstractView {
  init(resultType, mainContent, extraContent = ``) {
    this._resultType = resultType;
    this._mainContent = mainContent;
    this._extraContent = extraContent;
  }

  get template() {
    return getResultMarkup(this._resultType, this._mainContent, this._extraContent);
  }

  bind() {
    const replayBtn = this.element.querySelector(`.main-replay`);
    replayBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onReplayBtnClick(evt);
    });
  }

  onReplayBtnClick() {

  }
}
