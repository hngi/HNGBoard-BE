const jwt = require("jsonwebtoken");

const generateToken = (payload, secret, duration = "30d") => {
  const token = jwt.sign(payload, secret, {
    expiresIn: duration,
    algorithm: "HS256",
  });

  return token;
};

module.exports = generateToken;
