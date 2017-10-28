import {GameData, initialState, stats} from '../data/game-data';
import showArtistScreen from '../screens/artist';
import showGenreScreen from '../screens/genre';
import countPoints from './count-points';
import showResultScreen from '../screens/result';
import {GameResults, resultScreenContent} from '../data/results';
import showResults from './show-results';
import getResultMarkup from '../markup/get-result-markup'

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

  const addScoreToAllResults = (state) => {
    state.score = countPoints(state.answers, GameData.MAX_ATTEMPTS - state.mistakes);
    stats.push(state.score);
    return state;
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
    currentState = addScoreToAllResults(currentState);
    console.log(currentState);
    const game = new GameResults(currentState.score, 4, 250);
    const resultScreenMarkup = getResultMarkup(`attemptsOut`, showResults(stats, game));
    showResultScreen(resultScreenMarkup);
    resetGameData();

  } else if (currentState.currentQuestionIndex === 10) {
    currentState = addScoreToAllResults(currentState);
    const game = new GameResults(currentState.score, 0, 250);
    const resultScreenMarkup = getResultMarkup(`win`, resultScreenContent.win.message1(5, 0, 13, 1, 1),
        showResults(stats, game));
    showResultScreen(resultScreenMarkup);

  } else if (tasks[currentState.currentQuestionIndex].type === `artist`) {
    showQuestion(showArtistScreen);

  } else if (tasks[currentState.currentQuestionIndex].type === `genre`) {
    showQuestion(showGenreScreen);
  }
};

export default showNextScreen;
