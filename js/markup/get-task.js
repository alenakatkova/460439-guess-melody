const getTask = (type, task, options, link = ``) => {
  let titleClass,
    mainPart,
    formClass,
    button;

  if (type === `artist`) {
    titleClass = `title main-title`;
    mainPart = `<div class="player-wrapper">
        <div class="player">
          <audio src="${link}"></audio>
          <button class="player-control player-control--pause"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>`;
    formClass = `main-list`;
    button = ``;
  } else {
    titleClass = `title`;
    mainPart = ``;
    formClass = `${type}`;
    button = `<button class="genre-answer-send" type="submit">Ответить</button>`;
  }

  return `<div class="main-wrap">
      <h2 class="${titleClass}">${task}</h2>
      ${mainPart}
      <form class="${formClass}">
        ${options}
        ${button}
      </form>
    </div>`;
};

export default getTask;
