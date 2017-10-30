import {showMistakes, timer} from './get-header';

const getScreenMarkup = (task, type, num) => {
  return `<section class="main main--level main--level-${type}" id="${type}">
    ${timer}
    <div class="main-mistakes">${showMistakes(num)}</div>
    ${task}
  </section>`;
};

export default getScreenMarkup;
