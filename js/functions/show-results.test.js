import assert from 'assert';
import {messages, showResults} from './show-results';

describe(`Функция вывода результата`, () => {
  it(`должна правильно вычислить результаты игрока в случае выигрыша`, () => {
    let allScores = [4, 7, 5, 20];
    let playersResult = {
      score: 12,
      attemptsLeft: 2,
      time: 30000
    };
    assert.equal(showResults(allScores, playersResult), messages.win(2, 5, 60));

    allScores = [5, 12, 12, 6, 8, 9, 4, 13, 15, 4, 7, 5, 12, 20];
    playersResult = {
      score: 20,
      attemptsLeft: 4,
      time: 300
    };
    assert.equal(showResults(allScores, playersResult), messages.win(1, 15, 93));

    allScores = [5, 6, 8, 5, 10];
    playersResult = {
      score: 4,
      attemptsLeft: 1,
      time: 3300
    };
    assert.equal(showResults(allScores, playersResult), messages.win(6, 6, 0));
  });

  it(`должна вернуть '${messages.timeOut}', если время вышло`, () => {
    let allScores = [4, 7, 5, 12, 20];
    let playersResult = {
      score: 2,
      attemptsLeft: 2,
      time: 0
    };
    assert.equal(showResults(allScores, playersResult), messages.timeOut);
  });

  it(`должна вернуть '${messages.attemptsOut}', если закончились попытки`, () => {
    let allScores = [4, 7, 5, 12, 20];
    let playersResult = {
      score: 2,
      attemptsLeft: 0,
      time: 50000
    };
    assert.equal(showResults(allScores, playersResult), messages.attemptsOut);
  });
});
