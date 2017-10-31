import assert from 'assert';
import getTimer from './get-timer';

describe(`Функция создания таймера`, () => {
  it(`уменьшит переданное значение времени на 1`, () => {
    assert.equal(getTimer(30).tick().value, 29);
    assert.equal(getTimer(516).tick().value, 515);
  });
});
