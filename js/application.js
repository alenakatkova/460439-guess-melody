import startScreen from './screens/start/start-screen';
import questionScreen from './screens/question/question-screen';
import resultScreen from './screens/result/result-screen';
import {initialState} from './data/game-data';

const ControllerId = {
  START: ``,
  QUESTION: `question`,
  RESULT: `result`
};

const getDataForHash = (state) => {
  return {
    level: state.currentQuestionIndex + 1,
    mistakes: state.mistakes,
    time: state.time};
};

const saveState = (state) => {
  return JSON.stringify(getDataForHash(state));
};

const loadState = (dataString) => {
  try {
    return JSON.parse(dataString);
  } catch (e) {
    return initialState;
  }
};

const routes = {
  [ControllerId.START]: startScreen,
  [ControllerId.QUESTION]: questionScreen,
  [ControllerId.RESULT]: resultScreen
};

export default class App {
  static init() {
    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`?`);
      this.changeHash(id, data);
    };
    window.onHashChange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id, data) {
    const controller = routes[id];
    if (controller) {
      controller.init(loadState(data));
    }
  }

  static showWelcome() {
    startScreen.init();
    location.hash = ControllerId.START;
  }

  static showQuestion(state) {
    questionScreen.init(state);
    location.hash = `${ControllerId.QUESTION}?${saveState(state)}`;
  }

  static showResult(resultType, state, gameResults) {
    resultScreen.init(resultType, state, gameResults);
    location.hash = `${ControllerId.RESULT}?${saveState(state)}`;
  }
}

App.init();
