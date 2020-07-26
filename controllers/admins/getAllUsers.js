const { User } = require("../../models");
const responseHandler = require("../../utils/responseHandler");
const CustomError = require("../../utils/customError");

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find()
      .select("hngId userName currentStage tracks")
      .populate("tracks", "name _id")
      .exec();
    return responseHandler(
      res,
      200,
      allUsers,
      "successfully fetched all users"
    );
  } catch (err) {
    return next(
      new CustomError(500, "an error occurred processing your request", err)
    );
  }
};

module.exports = getAllUsers;
