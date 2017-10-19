import audio from './audio';
import {getRandomInteger} from '../util';

/**
 * Структура данных, описывающих два типа вопросов в игре. Включает в себя текст вопроса и список ответов
 */

const getRandomOptions = (amount) => {
  let mySet = new Set();
  while ([...mySet].length < amount) {
    mySet.add(audio[getRandomInteger(0, audio.length - 1)]);
  }
  return mySet;
};

const getQuestionData = (type) => {
  let question = {};
  question.type = type;
  if (question.type === `artist`) {
    question.task = `Кто исполняет эту песню?`;
    question.options = getRandomOptions(3);
    question.target = [...question.options][getRandomInteger(0, 2)];
    question.audioLink = question.target.src;
    question.correctAnswer = question.target.artist;
  } else {
    question.options = getRandomOptions(4);
    question.target = [...question.options][getRandomInteger(0, 3)].genre;
    question.task = `Выберите ${question.target} треки`;
    question.correctAnswers = [...question.options].filter((option) => {
      return option.genre === question.target;
    });
  }
  return question;
};

const getQuestions = () => {
  let questions = [];
  while (questions.length < 10) {
    questions.push(getQuestionData(`artist`));
    questions.push(getQuestionData(`genre`));
  }
  return questions;
};

const questions = getQuestions();

console.log(questions);

const question = {
  artist: getQuestionData(`artist`),
  genre: getQuestionData(`genre`)
};

export {questions, question};
