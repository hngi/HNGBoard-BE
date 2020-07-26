const { body, param } = require("express-validator");
const { User } = require("../../models");
const responseHandler = require("../../utils/responseHandler");
const CustomError = require("../../utils/customError");
const validate = require("../../middlewares/validate");

const updateUserProfile = [
  body("firstName", "please enter a first name").not().isEmpty(),
  body("lastName", "please enter a last name").not().isEmpty(),
  body("bio", "cannot be empty").not().isEmpty().optional(),
  body("userName", "cannot be empty").not().isEmpty(),
  body("location", "cannot be empty").not().isEmpty(),
  param("userId", "invalid user id").isMongoId(),
  validate,
  async (req, res, next) => {
    try {
      const { userId } = req.token;
      if (userId !== req.params.userId) {
        return next(new CustomError(400, "invalid user"));
      }

      const { firstName, lastName, bio, userName, location } = req.body;
      await User.findByIdAndUpdate(userId, {
        firstName,
        lastName,
        bio,
        userName,
        location,
      });
      return responseHandler(res, 200, {}, "successfully updated profile");
    } catch (err) {
      return next(
        new CustomError(500, "an error occurred processing your request", err)
      );
    }
  },
];

module.exports = updateUserProfile;
