import assert from 'assert';
import countPoints from './count-points';
import {isNumInBetweenMinMax} from '../util';
import {GameData} from '../data/game-data';

const MIN_SCORE = (GameData.AMOUNT_OF_QUESTIONS - (GameData.MAX_ATTEMPTS - 1))
    * GameData.counting.MIN_EARNED_POINTS - (GameData.MAX_ATTEMPTS - 1) * GameData.counting.LOST_POINTS;
const MAX_SCORE = GameData.AMOUNT_OF_QUESTIONS * GameData.counting.MAX_EARNED_POINTS;

describe(`Функция подсчета очков`, () => {
  it(`должна вернуть -1, если игрок ответил меньше, чем на ${GameData.AMOUNT_OF_QUESTIONS} вопросов`, () => {
    let answers = [
      {isAnswerCorrect: true, time: 33},
      {isAnswerCorrect: false, time: 34}
    ];
    let attemptsLeft = 3;
    assert.equal(countPoints(answers, attemptsLeft), -1);

    answers = [];
    attemptsLeft = 4;
    assert.equal(countPoints(answers, attemptsLeft), -1);

    answers = [
      {isAnswerCorrect: true, time: 23},
      {isAnswerCorrect: false, time: 12},
      {isAnswerCorrect: true, time: 23},
      {isAnswerCorrect: false, time: 34},
      {isAnswerCorrect: true, time: 45},
      {isAnswerCorrect: false, time: 56},
      {isAnswerCorrect: true, time: 23},
      {isAnswerCorrect: false, time: 12}
    ];
    attemptsLeft = 0;
    assert.equal(countPoints(answers, attemptsLeft), -1);
  });

  it(`должна вернуть -1, если у игрока закончились попытки`, () => {
    let answers = [
      {isAnswerCorrect: true, time: 23},
      {isAnswerCorrect: false, time: 23},
      {isAnswerCorrect: true, time: 23},
      {isAnswerCorrect: false, time: 23},
      {isAnswerCorrect: true, time: 23},
      {isAnswerCorrect: false, time: 23},
      {isAnswerCorrect: true, time: 23},
      {isAnswerCorrect: false, time: 23}
    ];
    let attemptsLeft = 0;
    assert.equal(countPoints(answers, attemptsLeft), -1);

    answers = [
      {isAnswerCorrect: false, time: 23},
      {isAnswerCorrect: false, time: 23},
      {isAnswerCorrect: false, time: 23},
      {isAnswerCorrect: false, time: 23}
    ];
    attemptsLeft = 0;
    assert.equal(countPoints(answers, attemptsLeft), -1);
  });

  it(`должна вернуть от ${MIN_SCORE} до ${MAX_SCORE} очков, 
      если игрок ответил на ${GameData.AMOUNT_OF_QUESTIONS} вопросов и не истратил все попытки`, () => {
    let answers = [
      {isAnswerCorrect: true, time: 12},
      {isAnswerCorrect: false, time: 3},
      {isAnswerCorrect: true, time: 34},
      {isAnswerCorrect: true, time: 23},
      {isAnswerCorrect: true, time: 34},
      {isAnswerCorrect: false, time: 43},
      {isAnswerCorrect: true, time: 23},
      {isAnswerCorrect: true, time: 12},
      {isAnswerCorrect: true, time: 23},
      {isAnswerCorrect: true, time: 23}
    ];
    let attemptsLeft = 2;
    assert(isNumInBetweenMinMax(countPoints(answers, attemptsLeft), MIN_SCORE, MAX_SCORE));

    answers = [
      {isAnswerCorrect: true, time: 10},
      {isAnswerCorrect: false, time: 20},
      {isAnswerCorrect: false, time: 30},
      {isAnswerCorrect: true, time: 40},
      {isAnswerCorrect: true, time: 40},
      {isAnswerCorrect: false, time: 50},
      {isAnswerCorrect: true, time: 60},
      {isAnswerCorrect: true, time: 30},
      {isAnswerCorrect: true, time: 30},
      {isAnswerCorrect: true, time: 20}
    ];
    attemptsLeft = 1;
    assert(isNumInBetweenMinMax(countPoints(answers, attemptsLeft), MIN_SCORE, MAX_SCORE));

    answers = [
      {isAnswerCorrect: true, time: 34},
      {isAnswerCorrect: true, time: 23},
      {isAnswerCorrect: true, time: 45},
      {isAnswerCorrect: true, time: 3},
      {isAnswerCorrect: true, time: 4},
      {isAnswerCorrect: true, time: 45},
      {isAnswerCorrect: true, time: 23},
      {isAnswerCorrect: true, time: 34},
      {isAnswerCorrect: true, time: 45},
      {isAnswerCorrect: true, time: 23}
    ];
    attemptsLeft = 4;
    assert(isNumInBetweenMinMax(countPoints(answers, attemptsLeft), MIN_SCORE, MAX_SCORE));

    answers = [
      {isAnswerCorrect: false, time: 23},
      {isAnswerCorrect: true, time: 23},
      {isAnswerCorrect: true, time: 45},
      {isAnswerCorrect: true, time: 3},
      {isAnswerCorrect: true, time: 4},
      {isAnswerCorrect: true, time: 45},
      {isAnswerCorrect: true, time: 23},
      {isAnswerCorrect: true, time: 34},
      {isAnswerCorrect: true, time: 45},
      {isAnswerCorrect: true, time: 23}
    ];
    attemptsLeft = 3;
    assert(isNumInBetweenMinMax(countPoints(answers, attemptsLeft), MIN_SCORE, MAX_SCORE));
  });

  it(`должна вернуть ${GameData.AMOUNT_OF_QUESTIONS * GameData.counting.MIN_EARNED_POINTS}, если игрок ответил на все вопросы и 
      каждый ответ занял ${GameData.QUICK_TIME} секунд и больше`, () => {
    let answers = [
      {isAnswerCorrect: true, time: 33},
      {isAnswerCorrect: true, time: 33},
      {isAnswerCorrect: true, time: 33},
      {isAnswerCorrect: true, time: 33},
      {isAnswerCorrect: true, time: 33},
      {isAnswerCorrect: true, time: 33},
      {isAnswerCorrect: true, time: 33},
      {isAnswerCorrect: true, time: 33},
      {isAnswerCorrect: true, time: 33},
      {isAnswerCorrect: true, time: 33}
    ];
    let attemptsLeft = 4;
    assert.equal(countPoints(answers, attemptsLeft), GameData.AMOUNT_OF_QUESTIONS * GameData.counting.MIN_EARNED_POINTS);
  });

  it(`должна вернуть ${MAX_SCORE}, если игрок ответил на все вопросы 
      и каждый ответ занял меньше ${GameData.QUICK_TIME} секунд`, () => {
    let answers = [
      {isAnswerCorrect: true, time: 12},
      {isAnswerCorrect: true, time: 12},
      {isAnswerCorrect: true, time: 12},
      {isAnswerCorrect: true, time: 12},
      {isAnswerCorrect: true, time: 12},
      {isAnswerCorrect: true, time: 12},
      {isAnswerCorrect: true, time: 12},
      {isAnswerCorrect: true, time: 12},
      {isAnswerCorrect: true, time: 12},
      {isAnswerCorrect: true, time: 12}
    ];
    let attemptsLeft = 4;
    assert.equal(countPoints(answers, attemptsLeft), MAX_SCORE);
  });
});
