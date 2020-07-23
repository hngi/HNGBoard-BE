const jwtMW = require("express-jwt");
const { USER_SECRET, ADMIN_SECRET, DISABLE_AUTH } = require("../config");

const credsRequired = DISABLE_AUTH.toLowerCase() === "false";

exports.authorizeUser = jwtMW({
  secret: USER_SECRET,
  algorithms: ["HS256"],
  requestProperty: "token",
  credentialsRequired: credsRequired,
});

exports.authorizeAdmin = jwtMW({
  secret: ADMIN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "token",
  credentialsRequired: credsRequired,
});
