const { Task } = require("../../models");
const responseHandler = require("../../utils/responseHandler");
const CustomError = require("../../utils/customError");

const getUserTasks = async (req, res, next) => {
  try {
    const { userId } = req.token;

    // find tasks that has the current userId in its users array
    // or is a general task
    const userTasks = await Task.find({
      $or: [{ users: { $elemMatch: { $eq: userId } } }, { general: true }],
    })
      .populate("track", "_id name")
      .select("name deadline track")
      .exec();
    return responseHandler(
      res,
      200,
      userTasks,
      "successfully fetched user tasks"
    );
  } catch (err) {
    return next(
      new CustomError(500, "an error occured processing your request")
    );
  }
};

module.exports = getUserTasks;
