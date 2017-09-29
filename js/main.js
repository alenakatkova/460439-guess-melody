(function () {
  const KEYCODES = {
    LEFT_ARROW: 37,
    RIGHT_ARROW: 39
  };

  const switchingOrder = [
    `#start`,
    `#artist`,
    `#genre`,
    `#win`,
    `#timeout`,
    `#attempts-out`
  ];

  /**
   * Функция генерирует массив экранов игры, отсортированных в порядке появления
   * @returns {Array} - Массив экранов
   */

  const getScreensArray = () => {
    const template = document.querySelector(`#templates`).content.cloneNode(true);
    const sortedArr = switchingOrder.map((screenId) => {
      return template.querySelector(screenId);
    });
    return sortedArr;
  };

  const screens = getScreensArray();

  const container = document.querySelector(`.main`);

  /**
   * Функция отрисовывает экран в контейнер с классом .main
   * @param {Number} indexInArr - номер экрана в массиве, в котором содержатся ссылки на все экраны игры
   */

  const renderScreen = (indexInArr) => {
    let fragment = document.createDocumentFragment();
    fragment.appendChild(screens[indexInArr]);
    container.appendChild(fragment);
  };

  /**
   * Функция скрывает отрисованный ранее экран, удаляя его из контейнера с классом .main
   */

  const hideScreen = () => {
    container.removeChild(container.firstChild);
  };

  let index = 0;
  renderScreen(index);

  /**
   * Функция переключает экраны игры при нажатии Alt + -> и Alt + <-
   * Предыдущий отрисованный экран удаляется из контейнера
   */

  function onDocumentPressAltArrow(evt) {
    if (evt.altKey) {
      if (evt.keyCode === KEYCODES.LEFT_ARROW && index > 0) {
        hideScreen();
        renderScreen(--index);
      } else if (evt.keyCode === KEYCODES.RIGHT_ARROW && index < screens.length - 1) {
        hideScreen();
        renderScreen(++index);
      }
    }
  }

  document.addEventListener('keydown', onDocumentPressAltArrow);
})();
