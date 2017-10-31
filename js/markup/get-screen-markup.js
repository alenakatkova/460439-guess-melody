import { showMistakes, showTimer, timer } from './get-header'

const getScreenMarkup = (task, type, num, timeInSec) => {
  return `<section class="main main--level main--level-${type}" id="${type}">
    ${showTimer(timeInSec)}
    <div class="main-mistakes">${showMistakes(num)}</div>
    ${task}
  </section>`;
};

export default getScreenMarkup;
