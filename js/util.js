const getRandomInteger = (min, max) => {
  let randomInteger = min + Math.random() * (max + 1 - min);
  randomInteger = Math.floor(randomInteger);
  return randomInteger;
};

const isNumInBetweenMinMax = (num, min, max) => {
  return num >= min && num <= max;
};

export {getRandomInteger, isNumInBetweenMinMax};
