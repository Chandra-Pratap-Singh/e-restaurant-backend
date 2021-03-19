const getRandomNumber = (length) => {
  return Math.floor(Math.random() * Math.pow(10, length));
};

const generateRandomUniqueId = () => {
  return `${Date.now()}${getRandomNumber(2)}`;
};

module.exports = {
  getRandomNumber,
  generateRandomUniqueId,
};
