const { validationResult } = require("express-validator");
const CustomError = require("../utils/customError");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new CustomError(422, "invalid inputs", errors.array()));
  }
  return next();
};

module.exports = validate;
