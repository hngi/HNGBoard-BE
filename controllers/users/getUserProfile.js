const { User } = require("../../models");
const responseHandler = require("../../utils/responseHandler");
const CustomError = require("../../utils/customError");

const getUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.token;
    const userProfile = await User.findById(userId)
      .select("-password -__v -createdAt -updatedAt")
      .populate("tracks", "_id name")
      .exec();
    return responseHandler(
      res,
      200,
      userProfile,
      "successfully fetched user profile"
    );
  } catch (err) {
    return next(
      new CustomError(500, "an error occured processing your request", err)
    );
  }
};

module.exports = getUserProfile;
