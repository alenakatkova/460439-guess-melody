const getValue = (array) => {
  let artist;
  for (let item of array) {
    if (item.isCorrect === true) {
      artist = item.title;
    }
  }
  return artist;
};

const adapt = (data) => {
  const adapted = [];

  Object.keys(data).forEach((it, i) => {
    adapted[i] = {
      type: data[it].type,
      playersAnswer: null,
      options: data[it].answers,
      task: data[it].question
    };

    if (data[it].type === `genre`) {
      adapted[i].target = data[it].genre;
      adapted[i].amountOfCorrectAnswers = data[it].answers.filter((option) => {
        return option.genre === data[it].genre;
      }).length;
    } else {
      adapted[i].correctAnswer = getValue(data[it].answers);
      adapted[i].audioLink = data[it].src;
    }
  });

  return adapted;
};

export default adapt;
