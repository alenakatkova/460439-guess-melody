const timeoutMessage = `Время вышло`;
const timeUnit = 1000;

/**
 * Функция создает таймер обратного отсчета
 * @param {Number} time - время, в течение которого будет работать таймер, в мс
 * @returns {Object} - объект таймера, в котором сохраняется текущее значение времени и описывается метод
 * tick(), уменьшающий значение времени на заданное число
 */

const getTimer = (time) => {
  return {
    value: time,
    tick() {
      return (time === 0) ? timeoutMessage : getTimer(time - timeUnit);
    }
  };
};

export {timeoutMessage, timeUnit, getTimer};
