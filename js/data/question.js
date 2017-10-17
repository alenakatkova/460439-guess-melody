/**
 * Структура данных, описывающих два типа вопросов в игре. Включает в себя текст вопроса и список ответов
 */

const question = {
  artist: {
    questionType: `artist`,
    task: `Кто исполняет эту песню?`,
    options: new Set([
      {
        artist: `Пелагея`
      },
      {
        artist: `Краснознаменная дивизия имени моей бабушки`
      },
      {
        artist: `Lorde`
      }
    ])
  },

  genre: {
    questionType: `genre`,
    task: (genre) => {
      return `Выберите ${genre} треки`;
    },
    options: new Set([
      {
        genre: `инди-рок`
      },
      {
        genre: `рок`
      },
      {
        genre: `поп`
      },
      {
        genre: `классика`
      }
    ])
  }
};

export default question;
