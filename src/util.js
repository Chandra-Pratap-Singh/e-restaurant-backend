const jwt = require("jsonwebtoken");

const getRandomNumber = (length) => {
  return Math.floor(Math.random() * Math.pow(10, length));
};

const generateRandomUniqueId = () => {
  return `${Date.now()}${getRandomNumber(2)}`;
};

const generateJWT = (payload) => {
  return jwt.sign(
    {
      ...payload,
    },
    process.env.JWT_SECRATE
    // {
    //   expiresIn: "1h",
    // }
  );
};

module.exports = {
  getRandomNumber,
  generateRandomUniqueId,
  generateJWT,
};
