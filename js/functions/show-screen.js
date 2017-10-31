/**
 * @exports - функция, показывающая экран игры
 */

const container = document.querySelector(`.main`);

/**
 * Функция удаляет из контейнера ранее отрисованный экран и добавляет в него новый
 * @param {Node} screen - узел экрана игры, который необходимо добавить в контейнер
 */

const showScreen = (screen) => {
  if (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  container.appendChild(screen);
};

export default showScreen;
