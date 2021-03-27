const { addUserToDb } = require("../services/user");
const bcrypt = require("bcryptjs");
const {
  SIGNUP_FAILED,
  EMAIL_DOES_NOT_EXISTS,
  WRONG_PASSWORD,
  LOGIN_FAILED,
  ADMIN_EMAIL,
} = require("../constants");
const { generateRandomUniqueId, generateJWT } = require("../util");
const user = require("../db/models/user");
const admin = require("../db/models/admin");
const { getAdminFromDb } = require("../services/admin");

exports.signUp = async (req, res, next) => {
  const user = req.body.user;
  const hashedPwd = await bcrypt.hash(user.password, 12);
  const { name, email, phone, address } = user;
  const newUser = {
    userId: generateRandomUniqueId(),
    name,
    password: hashedPwd,
    email,
    phone,
    addresses: [{ name, email, phone, address }],
    cartItems: [],
    orders: [],
  };
  addUserToDb(newUser)
    .then((user) => {
      const token = generateJWT({
        email: user.email,
        userId: user.userId,
        phone: user.phone,
        name: user.name,
      });
      res.status(200).json({
        userId: user.userId,
        name: user.name,
        token: token,
      });
    })
    .catch(() => res.status(500).json({ message: SIGNUP_FAILED }));
};

const adminLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  admin
    .findOne({ email })
    .then((admin) => {
      bcrypt.compare(password, admin.password).then((isEqual) => {
        if (!isEqual) {
          res.status(500).json({ message: LOGIN_FAILED });
        }
        const token = generateJWT({
          email: admin.email,
          userId: admin.userId,
          phone: admin.phone,
          name: admin.name,
        });
        res.status(200).json({
          userId: user.userId,
          name: user.name,
          adminToken: token,
        });
      });
    })
    .catch((err) => res.status(500).json({ message: LOGIN_FAILED }));
};

exports.userLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  user
    .findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(500).json({ message: EMAIL_DOES_NOT_EXISTS });
      }
      bcrypt.compare(password, user.password).then((isEqual) => {
        if (!isEqual) {
          res.status(500).json({ message: WRONG_PASSWORD });
        }
        const token = generateJWT({
          email: user.email,
          userId: user.userId,
          phone: user.phone,
          name: user.name,
        });
        res.status(200).json({
          userId: user.userId,
          name: user.name,
          token: token,
        });
      });
    })
    .catch((err) => res.status(500).json({ message: LOGIN_FAILED }));
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const admins = await getAdminFromDb();
  if (admins.some((admin) => admin.email === email)) {
    adminLogin(req, res, next);
  } else {
    this.userLogin(req, res, next);
  }
};

exports.addItemToCart = (req, res, next) => {};
