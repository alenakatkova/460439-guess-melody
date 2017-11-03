import startScreen from './screens/start/start-screen';
import QuestionScreen from './screens/question/question-screen';
import resultScreen from './screens/result/result-screen';
import {initialState} from './data/game-data';
import Loader from './data/questions-loader';
import adapt from './functions/adapt-questions-data';
import changeView from './functions/change-view';
import SplashScreen from './screens/splash-screen';

const ControllerId = {
  START: ``,
  QUESTION: `question`,
  RESULT: `result`
};

/**
 * Функция кодирует принимаемую строку
 * @param {String} string
 * @returns {String}
 */

function b64EncodeUnicode(string) {
  return btoa(encodeURIComponent(string).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode(`0x` + p1);
      }));
}

/**
 * Функция декодирует принимаемую строку
 * @param {String} string
 * @returns {String}
 */

function b64DecodeUnicode(string) {
  return decodeURIComponent(atob(string).split(``).map(function (c) {
    return `%` + (`00` + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(``));
}

/**
 * Функция кодирует состояние игры
 * @param {Object} state
 * @returns {String}
 */

const saveState = (state) => {
  return b64EncodeUnicode(JSON.stringify(state));
};

/**
 * Функция декодирует строку и получает из нее состояние игры
 * @param dataString
 * @return {Object} состояние игры
 */

const loadState = (dataString) => {
  try {
    return JSON.parse(b64DecodeUnicode(dataString));
  } catch (e) {
    return initialState;
  }
};

export default class App {
  static prepareDataAndInit() {
    const splash = new SplashScreen();
    changeView(splash.element);
    splash.start();

    try {
      Loader.loadData().
          then((data) => adapt(data)).
          then((questions) => App.init(questions)).
          catch(Loader.onError);
    } catch (e) {
      splash.showError(e.message);
    } finally {
      splash.stop();
    }
  }

  static init(questData) {
    App.routes = {
      [ControllerId.START]: startScreen,
      [ControllerId.QUESTION]: new QuestionScreen(questData),
      [ControllerId.RESULT]: resultScreen
    };

    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, state] = hashValue.split(`=`);
      this.changeHash(id, state);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id, state) {
    const controller = App.routes[id];

    if (controller) {
      controller.init(loadState(state));
    }
  }

  static showWelcome() {
    location.hash = ControllerId.START;
  }

  static showQuestion(state) {
    location.hash = `${ControllerId.QUESTION}=${saveState(state)}`;
  }

  static showResult(state) {
    location.hash = `${ControllerId.RESULT}=${saveState(state)}`;
  }
}

App.prepareDataAndInit();
