import assert from 'assert';
import {TIMEOUT_MESSAGE, getTimer} from './get-timer';

describe(`Функция создания таймера`, () => {
  it(`вернет сообщение о том, что время вышло, если переданное в нее значение (время в мс) = 0`, () => {
    assert.equal(getTimer(0).tick(), TIMEOUT_MESSAGE);
  });

  it(`уменьшит переданное значение времени на 1`, () => {
    assert.equal(getTimer(30).tick().value, 29);
    assert.equal(getTimer(516).tick().value, 515);
  });

  it(`будет уменьшать переданное значение на 1, пока оно не станет равным 0`, () => {
    let i;
    for (i = 7; i >= 0; i--) {
      if (i === 0) {
        assert.equal(getTimer(i).tick(), TIMEOUT_MESSAGE);
      } else {
        assert.equal(getTimer(i).tick().value, i - 1);
      }
    }
  });
});
