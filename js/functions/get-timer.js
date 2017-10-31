/**
 * Функция создает таймер обратного отсчета
 * @param {Number} time - время, в течение которого будет работать таймер, в секундах
 * @returns {Object} - объект таймера, в котором сохраняется текущее значение времени и описывается метод
 * tick(), уменьшающий значение времени на заданное число
 */

const getTimer = (value) => {
  return {
    value,

    tick() {
      if (this.value > 0) {
        this.value -= 1;
      }
      return {
        value: this.value
      };
    }
  };
};

export default getTimer;
