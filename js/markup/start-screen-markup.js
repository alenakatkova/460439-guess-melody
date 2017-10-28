import getRules from './get-rules';
import logo from './logo';

const startScreenMarkup = `<section class="main main--welcome" id="start">
    ${logo}
    <button class="main-play">Начать игру</button>
    ${getRules()};
  </section>`;

export default startScreenMarkup;
