/**
 * Функция добавляет слушатели события "клик" к кнопкам проигрывания аудиофайлов
 * @param players
 */

const playAudio = (players) => {
  players.forEach((player) => {
    const audio = player.querySelector(`audio`);
    const playAudioBtn = player.querySelector(`button`);
    playAudioBtn.classList.remove(`player-control--pause`);

    const onPlayBtnClick = (evt) => {
      const target = evt.target;
      evt.preventDefault();
      if (!target.classList.contains(`player-control--pause`)) {
        target.classList.add(`player-control--pause`);
        audio.play();
      } else {
        target.classList.remove(`player-control--pause`);
        audio.pause();
      }
    };

    playAudioBtn.addEventListener(`click`, onPlayBtnClick);
  });
};

export default playAudio;
