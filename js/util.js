const getRandomInteger = (min, max) => {
  let RandomInteger = min + Math.random() * (max + 1 - min);
  RandomInteger = Math.floor(RandomInteger);
  return RandomInteger;
};

export default getRandomInteger;
