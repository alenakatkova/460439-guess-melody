import assert from 'assert';
import {resultScreenContent, showResults} from './show-results';

describe(`Функция вывода результата`, () => {
  it(`должна правильно вычислить результаты игрока в случае выигрыша`, () => {
    let allScores = [4, 7, 5, 20];
    let playersResult = {
      score: 12,
      attemptsLeft: 2,
      TIME: 30000
    };
    assert.equal(showResults(allScores, playersResult), resultScreenContent.win(2, 5, 60));

    allScores = [5, 12, 12, 6, 8, 9, 4, 13, 15, 4, 7, 5, 12, 20];
    playersResult = {
      score: 20,
      attemptsLeft: 4,
      TIME: 300
    };
    assert.equal(showResults(allScores, playersResult), resultScreenContent.win(1, 15, 93));

    allScores = [5, 6, 8, 5, 10];
    playersResult = {
      score: 4,
      attemptsLeft: 1,
      TIME: 3300
    };
    assert.equal(showResults(allScores, playersResult), resultScreenContent.win(6, 6, 0));
  });

  it(`должна вернуть '${resultScreenContent.timeOut}', если время вышло`, () => {
    let allScores = [4, 7, 5, 12, 20];
    let playersResult = {
      score: 2,
      attemptsLeft: 2,
      TIME: 0
    };
    assert.equal(showResults(allScores, playersResult), resultScreenContent.timeOut);
  });

  it(`должна вернуть '${resultScreenContent.attemptsOut}', если закончились попытки`, () => {
    let allScores = [4, 7, 5, 12, 20];
    let playersResult = {
      score: 2,
      attemptsLeft: 0,
      TIME: 50000
    };
    assert.equal(showResults(allScores, playersResult), resultScreenContent.attemptsOut);
  });
});
