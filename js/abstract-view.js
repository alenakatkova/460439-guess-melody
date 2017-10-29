import renderElement from './functions/render-element';
import showScreen from './functions/show-screen'

class AbstractView {
  /**
   * Геттер создает разметку элемента
   * @returns {String} - строка, содержащая разметку
   */

  get template() {
    throw new Error(`Шаблон отсутствует`);
  }

  /** Метод создает DOM-элемент на основе шаблона, который возвращается геттером template */

  render() {
    return renderElement(this.template);
  }

  /** Метод, добавляющий обработчики события. По умолчанию ничего не делает */

  bind() {

  }

  /**
   * Метод создает DOM-элемент с помощью метода render и добавляет ему обработчики с помощью метода bind
   * @returns {Node} DOM-элемент
   */

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }
}

export default AbstractView;
