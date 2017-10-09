import assert from 'assert';
import {countPoints, minPoints, maxPoints, amountOfQuestions, minEarnedPoints, quickTime} from './count-points';
import {isNumInBetweenMinMax} from '../util';

describe(`Функция подсчета очков`, () => {
  it(`должна вернуть -1, если игрок ответил меньше, чем на ${amountOfQuestions} вопросов`, () => {
    let answers = [
      {isAnswerCorrect: true, time: 13333},
      {isAnswerCorrect: false, time: 17666}
    ];
    let attemptsLeft = 2;
    assert.equal(countPoints(answers, attemptsLeft), -1);

    answers = [];
    attemptsLeft = 3;
    assert.equal(countPoints(answers, attemptsLeft), -1);

    answers = [
      {isAnswerCorrect: true, time: 13333},
      {isAnswerCorrect: false, time: 17666},
      {isAnswerCorrect: true, time: 13333},
      {isAnswerCorrect: false, time: 17666},
      {isAnswerCorrect: true, time: 13333},
      {isAnswerCorrect: false, time: 17666},
      {isAnswerCorrect: true, time: 13333},
      {isAnswerCorrect: false, time: 17666}
    ];
    attemptsLeft = 0;
    assert.equal(countPoints(answers, attemptsLeft), -1);
  });

  it(`должна вернуть -1, если у игрока закончились попытки`, () => {
    let answers = [
      {isAnswerCorrect: true, time: 27657},
      {isAnswerCorrect: false, time: 27657},
      {isAnswerCorrect: true, time: 27657},
      {isAnswerCorrect: false, time: 27657},
      {isAnswerCorrect: true, time: 27657},
      {isAnswerCorrect: false, time: 27657},
      {isAnswerCorrect: true, time: 27657},
      {isAnswerCorrect: false, time: 27657}
    ];
    let attemptsLeft = 0;
    assert.equal(countPoints(answers, attemptsLeft), -1);

    answers = [
      {isAnswerCorrect: false, time: 27657},
      {isAnswerCorrect: false, time: 27657},
      {isAnswerCorrect: false, time: 27657},
      {isAnswerCorrect: false, time: 27657}
    ];
    attemptsLeft = 0;
    assert.equal(countPoints(answers, attemptsLeft), -1);
  });

  it(`должна вернуть от ${minPoints} до ${maxPoints} очков, 
      если игрок ответил на ${amountOfQuestions} вопросов и не истратил все попытки`, () => {
    let answers = [
      {isAnswerCorrect: true, time: 14333},
      {isAnswerCorrect: false, time: 17896},
      {isAnswerCorrect: true, time: 30500},
      {isAnswerCorrect: true, time: 38000},
      {isAnswerCorrect: true, time: 6000},
      {isAnswerCorrect: false, time: 20000},
      {isAnswerCorrect: true, time: 21000},
      {isAnswerCorrect: true, time: 11000},
      {isAnswerCorrect: true, time: 16546},
      {isAnswerCorrect: true, time: 12345}
    ];
    let attemptsLeft = 2;
    assert(isNumInBetweenMinMax(countPoints(answers, attemptsLeft), minPoints, maxPoints));

    answers = [
      {isAnswerCorrect: true, time: 1000},
      {isAnswerCorrect: false, time: 2000},
      {isAnswerCorrect: false, time: 3000},
      {isAnswerCorrect: true, time: 4000},
      {isAnswerCorrect: true, time: 40000},
      {isAnswerCorrect: false, time: 50000},
      {isAnswerCorrect: true, time: 55000},
      {isAnswerCorrect: true, time: 33000},
      {isAnswerCorrect: true, time: 23000},
      {isAnswerCorrect: true, time: 5000}
    ];
    attemptsLeft = 1;
    assert(isNumInBetweenMinMax(countPoints(answers, attemptsLeft), minPoints, maxPoints));

    answers = [
      {isAnswerCorrect: true, time: 14333},
      {isAnswerCorrect: true, time: 17896},
      {isAnswerCorrect: true, time: 30500},
      {isAnswerCorrect: true, time: 38000},
      {isAnswerCorrect: true, time: 6000},
      {isAnswerCorrect: true, time: 20000},
      {isAnswerCorrect: true, time: 21000},
      {isAnswerCorrect: true, time: 11000},
      {isAnswerCorrect: true, time: 16546},
      {isAnswerCorrect: true, time: 12345}
    ];
    attemptsLeft = 4;
    assert(isNumInBetweenMinMax(countPoints(answers, attemptsLeft), minPoints, maxPoints));

    answers = [
      {isAnswerCorrect: false, time: 14333},
      {isAnswerCorrect: true, time: 17896},
      {isAnswerCorrect: true, time: 30500},
      {isAnswerCorrect: true, time: 38000},
      {isAnswerCorrect: true, time: 6000},
      {isAnswerCorrect: true, time: 20000},
      {isAnswerCorrect: true, time: 21000},
      {isAnswerCorrect: true, time: 11000},
      {isAnswerCorrect: true, time: 16546},
      {isAnswerCorrect: true, time: 12345}
    ];
    attemptsLeft = 3;
    assert(isNumInBetweenMinMax(countPoints(answers, attemptsLeft), minPoints, maxPoints));
  });

  it(`должна вернуть ${amountOfQuestions * minEarnedPoints}, если игрок ответил на все вопросы и 
      каждый ответ занял ${quickTime} секунд и больше`, () => {
    let answers = [
      {isAnswerCorrect: true, time: 51000},
      {isAnswerCorrect: true, time: 30500},
      {isAnswerCorrect: true, time: 51000},
      {isAnswerCorrect: true, time: 30001},
      {isAnswerCorrect: true, time: 30200},
      {isAnswerCorrect: true, time: 50003},
      {isAnswerCorrect: true, time: 44000},
      {isAnswerCorrect: true, time: 33999},
      {isAnswerCorrect: true, time: 32000},
      {isAnswerCorrect: true, time: 50000}
    ];
    let attemptsLeft = 4;
    assert.equal(countPoints(answers, attemptsLeft), amountOfQuestions * minEarnedPoints);
  });

  it(`должна вернуть ${maxPoints}, если игрок ответил на все вопросы 
      и каждый ответ занял ${quickTime} секунд и больше`, () => {
    let answers = [
      {isAnswerCorrect: true, time: 21000},
      {isAnswerCorrect: true, time: 20500},
      {isAnswerCorrect: true, time: 11000},
      {isAnswerCorrect: true, time: 20001},
      {isAnswerCorrect: true, time: 20200},
      {isAnswerCorrect: true, time: 10003},
      {isAnswerCorrect: true, time: 14000},
      {isAnswerCorrect: true, time: 23999},
      {isAnswerCorrect: true, time: 22000},
      {isAnswerCorrect: true, time: 10000}
    ];
    let attemptsLeft = 4;
    assert.equal(countPoints(answers, attemptsLeft), maxPoints);
  });
});
