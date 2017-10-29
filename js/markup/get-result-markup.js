import {resultScreenContent} from '../data/results';
import logo from './logo';

const getResultMarkup = (resultType, mainContent, extraContent = ``) => {
  let content;
  let title;
  let button;

  switch (resultType) {
    case `win`:
      content = `<div class="main-stat">${mainContent}</div>
          <span class="main-comparison">${extraContent}</span>`;
      button = `<span role="button" tabindex="0" class="main-replay">${resultScreenContent.win.button}</span>`;
      title = `<h2 class="title">${resultScreenContent.win.title}</h2>`;
      break;
    case `timeOut`:
      content = `<div class="main-stat">${mainContent}</div>`;
      button = `<span role="button" tabindex="0" class="main-replay">${resultScreenContent.timeOut.button}</span>`;
      title = `<h2 class="title">${resultScreenContent.timeOut.title}</h2>`;
      break;
    case `attemptsOut`:
      content = `<div class="main-stat">${mainContent}</div>`;
      button = `<span role="button" tabindex="0" class="main-replay">${resultScreenContent.attemptsOut.button}</span>`;
      title = `<h2 class="title">${resultScreenContent.attemptsOut.title}</h2>`;
      break;
  }

  return `<section class="main main--result" id="resultType">
    ${logo}
    ${title}
    ${content}
    ${button}
  </section>`;
};

export default getResultMarkup;
