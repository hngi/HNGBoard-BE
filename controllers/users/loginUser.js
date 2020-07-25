const { body, validationResult } = require("express-validator");
const { User } = require("../../models");
const { comparePassword } = require("../../utils/password");
const CustomError = require("../../utils/customError");
const responseHandler = require("../../utils/responseHandler");
const generateToken = require("../../utils/generateToken");
const { USER_SECRET } = require("../../config");

const loginUser = [
  body("email", "invalid email").isEmail(),
  body("password", "enter password equal to or longer than 8").isLength({
    min: 8,
  }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(new CustomError(422, "invalid inputs", errors.array()));
      }

      const user = await User.findOne({ email: req.body.email })
        .populate("tracks", "_id name")
        .exec();

      if (!user) {
        return next(
          new CustomError(403, "incorrect email/password combination")
        );
      }
      const passwordMatched = await comparePassword(
        req.body.password,
        user.password
      );
      if (!passwordMatched) {
        return next(
          new CustomError(403, "incorrect email/password combination")
        );
      }

      const token = generateToken(
        { userId: user._id, email: req.body.email },
        USER_SECRET
      );

      /* eslint-disable no-unused-vars */
      const {
        __v,
        password,
        createdAt,
        updatedAt,
        _id,
        ...rest
      } = user.toObject();
      return responseHandler(
        res,
        200,
        {
          userId: _id,
          hngId: user.hngId,
          currentStage: user.currentStage,
          tracks: user.tracks,
          token,
        },
        "successfully logged in"
      );
    } catch (err) {
      return next(new CustomError(500, "something went wrong", err));
    }
  },
];

module.exports = loginUser;
