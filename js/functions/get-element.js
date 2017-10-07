/**
 * @exports - функция, создающая DOM-элемент:
 * @param {String} markup - строка с разметкой DOM-элемента
 * @returns - DOM-элемент
 */

const getElement = (markup) => {
  const parser = new DOMParser();
  const result = parser.parseFromString(markup, `text/html`);
  return result.body.firstElementChild;
};

export default getElement;
