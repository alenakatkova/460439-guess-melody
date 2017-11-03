/**
 * Модуль создает структуру данных, описывающих два типа вопросов в игре
 * @export - функция, создающая массив вопросов
 */

import audio from './audio';
import {getRandomInteger} from '../util';

/**
 * Функция создает сет вариантов ответов для вопросов
 * @param {Number} amount - количество элементов в сете
 * @returns {Set} mySet
 */

const getRandomOptions = (amount) => {
  let mySet = new Set();
  while ([...mySet].length < amount) {
    mySet.add(audio[getRandomInteger(0, audio.length - 1)]);
  }
  return mySet;
};

/**
 * Функция генерирует вопрос для игры
 * @param {String} type - тип вопроса (`artist` / `type`), в зависимости от которого меняются ключи в объекте вопроса
 * @constructor
 */

const Question = function (type) {
  this.type = type;
  this.playersAnswer = null;
  if (this.type === `artist`) {
    // выбираем 3 рандомных песни из списка композиций, их исполнители будут вариантами ответов на вопрос
    this.options = getRandomOptions(3);

    // одну из песен делаем вопросом (ссылка на нее будет добавлена в тег audio, ее исполнителя надо выбрать из вариантов)
    this.target = [...this.options][getRandomInteger(0, 2)];
    this.task = `Кто исполняет эту песню? ${this.target.artist}`;
    this.correctAnswer = this.target.artist;
    this.audioLink = this.target.src;
  } else {
    // выбираем 4 рандомных композиции - они будут вариантами ответа
    this.options = getRandomOptions(4);

    // выбираем рандомный жанр для вопроса
    this.target = [...this.options][getRandomInteger(0, 3)].genre;
    this.task = `Выберите ${this.target} треки`;

    // считаем количество правильных ответов
    this.amountOfCorrectAnswers = [...this.options].filter((option) => {
      return option.genre === this.target;
    }).length;
  }
};

/**
 * Функция создает массив вопросов для игры
 * @returns {Array} questions - массив вопросов
 */

const getQuestions = () => {
  let questions = [];
  while (questions.length < 10) {
    questions.push(new Question(`artist`));
    questions.push(new Question(`genre`));
  }
  return questions;
};

export default getQuestions;
