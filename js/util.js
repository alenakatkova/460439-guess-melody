const getRandomInteger = (min, max) => {
  let randomInteger = min + Math.random() * (max + 1 - min);
  randomInteger = Math.floor(randomInteger);
  return randomInteger;
};

export default getRandomInteger;
