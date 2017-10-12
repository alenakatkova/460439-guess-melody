const TIMEOUT_MESSAGE = `Время вышло`;

/**
 * Функция создает таймер обратного отсчета
 * @param {Number} time - время, в течение которого будет работать таймер, в секундах
 * @returns {Object} - объект таймера, в котором сохраняется текущее значение времени и описывается метод
 * tick(), уменьшающий значение времени на заданное число
 */

const getTimer = (time) => {
  return {
    value: time,
    tick() {
      return (time === 0) ? TIMEOUT_MESSAGE : getTimer(time - 1);
    }
  };
};

export {TIMEOUT_MESSAGE, getTimer};
