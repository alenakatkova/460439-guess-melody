import AbstractView from '../abstract-view';
//import startScreenMarkup from '../markup/start-screen-markup';

export default class StartScreenView extends AbstractView {
  get template() {
    return startScreenMarkup;
  }

  bind() {
    const playBtn = this.element.querySelector(`.main-play`);
    playBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onPlayBtnClick();
    });
  }

  onPlayBtnClick() {

  }
}
