/**
 * @exports - функция, создающая DOM-элемент:
 * @param {String} markup - строка с разметкой DOM-элемента
 * @returns {Node} DOM-элемент
 */

const renderElement = (markup) => {
  const parser = new DOMParser();
  const result = parser.parseFromString(markup, `text/html`);
  return result.body.firstElementChild;
};

export default renderElement;
