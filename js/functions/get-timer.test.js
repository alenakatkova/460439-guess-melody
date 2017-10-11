import assert from 'assert';
import {timeoutMessage, timeUnit, getTimer} from './get-timer';

describe(`Функция создания таймера`, () => {
  it(`вернет сообщение о том, что время вышло, если переданное в нее значение (время в мс) = 0`, () => {
    assert.equal(getTimer(0).tick(), timeoutMessage);
  });

  it(`уменьшит на ${timeUnit} переданное значение времени`, () => {
    assert.equal(getTimer(30000).tick().value, 30000 - timeUnit);
    assert.equal(getTimer(300000).tick().value, 300000 - timeUnit);
  });

  it(`будет уменьшать переданное значение на ${timeUnit}, пока оно не станет равным 0`, () => {
    let i;
    for (i = 7; i >= 0; i--) {
      if (i === 0) {
        assert.equal(getTimer(i * timeUnit).tick(), timeoutMessage);
      } else {
        assert.equal(getTimer(i * timeUnit).tick().value, i * timeUnit - timeUnit);
      }
    }
  });
});
