import {GameData, initialState, stats} from '../data/game-data';
import showArtistScreen from '../screens/artist';
import showGenreScreen from '../screens/genre';
import countPoints from './count-points';
import showResultScreen from '../screens/result';
import {GameResults, resultScreenContent} from '../data/results';
import showResults from './show-results';

let currentState = Object.assign({}, initialState);

const showNextScreen = () => {
  const tasks = currentState.tasks;
  currentState.answers = tasks.map((task) => {
    return task.playersAnswer;
  });

  if (currentState.currentQuestionIndex > 0
      && currentState.answers[currentState.currentQuestionIndex - 1].isAnswerCorrect === false) {
    currentState.mistakes += 1;
  }

  /**
   * Функция считает полученные игроком очки и добавляет их в массив с результатами других игроков
   */

  const addScoreToAllResults = () => {
    currentState.score = countPoints(currentState.answers, GameData.MAX_ATTEMPTS - currentState.mistakes);
    stats.push(currentState.score);
  };

  /**
   *  Функция отрисовывает вопрос и обновляет счетчик вопросов
   * @param {Function} type
   */

  const showQuestion = (type) => {
    type(tasks[currentState.currentQuestionIndex]);
    currentState.currentQuestionIndex += 1;
  };

  /**
   * Функция сбрасывает статистику игры
   */

  const resetGameData = () => {
    currentState = Object.assign({}, initialState);
    let i = 0;
    while (tasks[i].playersAnswer !== null) {
      tasks[i].playersAnswer = null;
      i++;
    }
  };

  if (currentState.mistakes === GameData.MAX_ATTEMPTS) {
    addScoreToAllResults();
    const game = new GameResults(currentState.score, 4, 250);
    showResultScreen(resultScreenContent.attemptsOut.title,
        showResults(stats, game), ``, resultScreenContent.attemptsOut.button);
    resetGameData();

  } else if (currentState.currentQuestionIndex === 10) {
    addScoreToAllResults();
    const game = new GameResults(currentState.score, 0, 250);
    showResultScreen(resultScreenContent.win.title,
        resultScreenContent.win.message1(5, 0, 13, 1, 1),
        showResults(stats, game), resultScreenContent.win.button);
    resetGameData();

  } else if (tasks[currentState.currentQuestionIndex].type === `artist`) {
    showQuestion(showArtistScreen);

  } else if (tasks[currentState.currentQuestionIndex].type === `genre`) {
    showQuestion(showGenreScreen);
  }
};

export default showNextScreen;
