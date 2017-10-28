import {GameData} from '../data/game-data';

const getRules = () => {
  return `<h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;${GameData.MAX_TIME / 60} минут ответить на все вопросы.<br>
      Ошибиться можно ${GameData.MAX_ATTEMPTS - 1} раза.<br>
      Удачи!
    </p>`;
};

export default getRules;
