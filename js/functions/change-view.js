/**
 * @exports - функция, показывающая экран игры
 */

const container = document.querySelector(`.main`);

/**
 * Функция удаляет из контейнера ранее отрисованный экран и добавляет в него новый
 * @param {Node} view - узел экрана игры, который необходимо добавить в контейнер
 */

const changeView = (view) => {

  if (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  container.appendChild(view);
};

export default changeView;
