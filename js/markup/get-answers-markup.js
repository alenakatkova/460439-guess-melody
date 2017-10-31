const getAnswersMarkup = (type, options) => {
  const answers = [...options].map((option, index) => {
    if (type === `artist`) {
      return `<div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="val-${index}"/>
          <label class="main-answer" for="answer-${index}">
            <img class="main-answer-preview" src="http://placehold.it/134x134"
                 alt="${option.artist}" data-link="${option.src}" width="134" height="134">
            ${option.artist}
          </label>
        </div>`;
    } else {
      return `<div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio src="${option.src}"></audio>
              <button class="player-control player-control--pause"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-${index}" id="a-${index}" data-genre="${option.genre}" data-src="${option.src}">
          <label class="genre-answer-check" for="a-${index}"></label>
        </div>`;
    }
  }).join(``);

  return answers;
};

export default getAnswersMarkup;
