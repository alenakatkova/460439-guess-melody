import renderElement from '../functions/render-element';
import initializeReplay from '../functions/replay';
import showScreen from '../functions/show-screen';

const showResultScreen = (markup) => {
  const resultScreen = renderElement(markup);

  /**
   * Добавление взаимодействия пользователя с экраном
   */

  initializeReplay(resultScreen);

  return showScreen(resultScreen);
};

export default showResultScreen;
