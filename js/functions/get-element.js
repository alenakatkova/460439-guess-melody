/**
 * @exports - функция, создающая DOM-элемент:
 * @param {String} markup - строка с разметкой DOM-элемента
 * @returns - клон узла с дочерними элементами
 */

const getElement = (markup) => {
  const template = document.createElement(`template`);
  template.innerHTML = markup;
  return template.content.cloneNode(true);
};

export default getElement;
