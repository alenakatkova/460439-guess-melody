import showTimer from './get-timer-markup';
import showMistakes from '../functions/show-mistakes';

const mistakeMarkup = `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`;

const getQuestionMarkup = (task, type, amountOfMistakes, timeInSec) => {
  return `<section class="main main--level main--level-${type}" id="${type}">
    ${showTimer(timeInSec)}
    <div class="main-mistakes">${showMistakes(amountOfMistakes, mistakeMarkup)}</div>
    ${task}
  </section>`;
};

export default getQuestionMarkup;
