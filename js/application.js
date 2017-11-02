import startScreen from './screens/start/start-screen';
import questionScreen from './screens/question/question-screen';
import resultScreen from './screens/result/result-screen';

export default class App {
  static showWelcome() {
    startScreen.init();
  }

  static showQuestion(state) {
    questionScreen.init(state);
  }

  static showResult(resultType, mainMessage, extraMessage) {
    resultScreen.init(resultType, mainMessage, extraMessage);
  }
}
