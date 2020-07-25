const { Task } = require("../../models");
const responseHandler = require("../../utils/responseHandler");
const CustomError = require("../../utils/customError");

const getUserTasks = async (req, res, next) => {
  try {
    const { userId } = req.token;
    const userTasks = await Task.find({
      users: { $elemMatch: { $eq: userId } },
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
