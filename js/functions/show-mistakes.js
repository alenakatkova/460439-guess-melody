/**
 * Функция создает строку с разметкой блока ошибок
 * @param {Number} amountOfMistakes - количество ошибок
 * @param {String} markup - строка с разметкой ошибки
 * @returns {string}
 */

const showMistakes = (amountOfMistakes, markup) => {
  let arr = [];
  if (amountOfMistakes > 0) {
    for (let i = 0; i < amountOfMistakes; i++) {
      arr.push(markup);
    }
  }
  return arr.join(``);
};

export default showMistakes;
