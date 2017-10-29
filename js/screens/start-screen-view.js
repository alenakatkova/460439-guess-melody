import AbstractView from '../abstract-view';
import logo from '../markup/logo';
import getRules from '../markup/get-rules';

export default class StartScreenView extends AbstractView {
  get template() {
    return `<section class="main main--welcome" id="start">
      ${logo}
        <button class="main-play">Начать игру</button>
      ${getRules()};
    </section>`;
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
