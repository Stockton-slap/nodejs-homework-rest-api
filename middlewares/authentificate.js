const HttpError = require("../helpers/HTTPError");
const jwt = require("jsonwebtoken");
const User = require("../service/schemas/user");

const secret = process.env.SECRET_KEY;

const authentificate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }

  try {
    const { id } = jwt.verify(token, secret);

    const user = await User.findById(id);
    user.token = token;

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Not authorized"));
    }

    req.user = user;

    next();
  } catch {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = authentificate;
