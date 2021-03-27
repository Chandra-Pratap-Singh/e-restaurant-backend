const jwt = require("jsonwebtoken");
const { AUTHORIZATION_FAILED } = require("../constants");
const { getAdminFromDb } = require("../services/admin");
const { getUserFromDb } = require("../services/user");

exports.authorize = async (req, res, next) => {
  try {
    const token = req.get("authorization").split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRATE);
    const { name, userId, email, phone } = await getUserFromDb(
      { userId: decodedToken.userId },
      "userId name email phone"
    );
    if (!userId)
      res
        .status(500)
        .json({ message: AUTHORIZATION_FAILED, unAuthorized: true });
    req.userName = name;
    req.userId = userId;
    req.userEmail = email;
    req.userPhone = phone;
    next();
  } catch {
    res.status(500).json({ message: AUTHORIZATION_FAILED, unAuthorized: true });
  }
};

exports.authorizeAdmin = async (req, res, next) => {
  try {
    const token = req.get("authorization").split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRATE);
    const admins = await getAdminFromDb();
    const admin = admins.find((user) => user.userId === decodedToken.userId);
    if (!admin)
      res
        .status(500)
        .json({ message: AUTHORIZATION_FAILED, unAuthorized: true });
    req.adminName = admin.name;
    req.adminId = admin.userId;
    req.adminEmail = admin.email;
    req.adminPhone = admin.phone;
    next();
  } catch {
    res.status(500).json({ message: AUTHORIZATION_FAILED, unAuthorized: true });
  }
};
