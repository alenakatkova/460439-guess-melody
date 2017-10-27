import getElement from '../functions/get-element';
import initializeReplay from '../functions/replay';
import renderScreen from '../functions/render-screen';


const showResultScreen = (heading, mainContent, extraContent, link) => {
  const logo = `<section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>`;

  const title = `<h2 class="title">${heading}</h2>`;

  const mainMessage = `<div class="main-stat">${mainContent}</div>`;

  const extraMessage = `<span class="main-comparison">${extraContent}</span>`;

  const button = `<span role="button" tabindex="0" class="main-replay">${link}</span>`;

  const markup = `<section class="main main--result" id="timeout">
    ${logo}
    ${title}
    ${mainMessage}
    ${extraMessage}
    ${button}
  </section>`;

  const resultScreen = getElement(markup);

  /**
   * Добавление взаимодействия пользователя с экраном
   */

  initializeReplay(resultScreen);

  return renderScreen(resultScreen);
};

export default showResultScreen;
