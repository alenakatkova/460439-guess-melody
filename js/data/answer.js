/**
 * Функция создает объект ответа
 * @param {Boolean} correctness - правильность ответа
 * @param {Number} time - время, за которое дан ответ
 * @constructor
 */

const Answer = function (correctness, time) {
  this.isAnswerCorrect = correctness;
  this.time = time;
};

export default Answer;
