import AbstractView from '../../abstract-view';
import logoMarkup from '../../markup/logo-markup';
import getRules from '../../markup/get-rules-markup';

export default class StartScreenView extends AbstractView {
  get template() {
    return `<section class="main main--welcome" id="start">
      ${logoMarkup}
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
