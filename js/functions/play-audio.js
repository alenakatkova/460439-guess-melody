/**
 * Функция добавляет слушатели события "клик" к кнопкам проигрывания аудиофайлов
 * @param players
 */

const playAudio = (players) => {
  const playButtons = [];

  players.forEach((player) => {
    const audio = player.querySelector(`audio`);
    const playButton = player.querySelector(`button`);

    playButtons.push(playButton);

    // меняем первоначальный вид кнопки с "пауза" на "включить аудио"
    playButton.classList.remove(`player-control--pause`);

    const onPlayBtnClick = (evt) => {
      evt.preventDefault();

      if (!evt.target.classList.contains(`player-control--pause`)) {
        evt.target.classList.add(`player-control--pause`);
        audio.play();

        // Выбираем все кнопки, кроме той, на которую только что нажади
        const otherButtons = playButtons.filter((btn) => {
          return btn !== evt.target;
        });

        // Останавливаем прерыдущую включенную композицию
        otherButtons.forEach((btn) => {
          btn.classList.remove(`player-control--pause`);
          btn.previousElementSibling.pause();
        });
        
      } else {
        evt.target.classList.remove(`player-control--pause`);
        audio.pause();
      }
    };

    playButton.addEventListener(`click`, onPlayBtnClick);
  });
};

export default playAudio;
