const { body, param, sanitizeBody } = require("express-validator");
const { Submission, Task } = require("../../models");
const validateMW = require("../../middlewares/validate");
const CustomError = require("../../utils/customError");
const responseHandler = require("../../utils/responseHandler");

const submitTask = [
  param("userId", "invalid userId").isMongoId(),
  param("taskId", "invalid taskId").isMongoId(),
  body("link", "invalid submission link").isURL(),
  body("comment", "comment cannot be empty").not().isEmpty(),
  sanitizeBody("*"),
  validateMW,
  async (req, res, next) => {
    try {
      const { userId } = req.token;

      if (userId !== req.params.userId) {
        return next(new CustomError(400, "invalid user"));
      }

      const task = await Task.findById(req.params.taskId);

      if (!task) {
        return next(new CustomError(404, "task not found"));
      }

      if (new Date() > new Date(task.deadline)) {
        return next(new CustomError(400, "task has expired"));
      }

      const submission = new Submission({
        user: userId,
        task: task._id,
        link: req.body.link,
        comment: req.body.comment,
      });

      const savedSubmission = await submission.save();
      task.submissions.push(submission._id);
      await task.save();

      return responseHandler(
        res,
        201,
        {
          submissionDate: savedSubmission.createdAt,
          submissionStatus: savedSubmission.status,
        },
        "task submitted successfully"
      );
    } catch (err) {
      return next(new CustomError(500, "something went wrong", err));
    }
  },
];

module.exports = submitTask;
