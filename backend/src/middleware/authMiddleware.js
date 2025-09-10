const jwt = require("jsonwebtoken");
const { default: AppError } = require("../utils/errorHandler");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("token is:",authHeader)

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("No token provided",401));
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(new AppError("Forbidden Invalid Token",403))
    }
    req.user = decoded; 
    next();
  });
};

module.exports = verifyToken;

