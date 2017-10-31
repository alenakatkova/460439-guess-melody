/**
 * Функция создает объект ответа
 * @param {Boolean} correctness - правильность ответа
 * @param {Number} time - время, за которое дан ответ
 * @param {String|Array} link - ссылка(и) на аудиофайл(ы) ответа
 * @constructor
 */

const Answer = function (correctness, time, link) {
  this.isAnswerCorrect = correctness;
  this.time = time;
  this.audio = link;
};

export default Answer;
