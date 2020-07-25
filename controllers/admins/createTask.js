const { body } = require("express-validator");
const { Task } = require("../../models");
const validateMW = require("../../middlewares/validate");
const responseHandler = require("../../utils/responseHandler");
const CustomError = require("../../utils/customError");

const createTask = [
  body("name", "name cannot be empty").not().isEmpty(),
  body("content", "content cannot be empty").not().isEmpty(),
  body("deadline", "enter a valid date in the future for deadline").isAfter(),
  body("track", "track cannot be empty").not().isEmpty(),
  body("admins", "admins must be an array").isArray(),
  body("admins.*", "invalid admin id").isMongoId(),
  body("users", "users must be an array").isArray(),
  body("users.*", "invalid user id").isMongoId(),
  validateMW,
  async (req, res, next) => {
    try {
      const { name, content, deadline, track, admins, users } = req.body;
      const task = new Task({
        name,
        content,
        deadline,
        track,
        admins,
        users,
      });

      await task.save();
      return responseHandler(
        res,
        201,
        { taskId: task._id },
        "task successfully created"
      );
    } catch (err) {
      return next(new CustomError(500, "something went wrong", err));
    }
  },
];

module.exports = createTask;
