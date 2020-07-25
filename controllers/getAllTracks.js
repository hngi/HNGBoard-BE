const { Track } = require("../models");
const CustomError = require("../utils/customError");
const responseHandler = require("../utils/responseHandler");

const getAllTracks = async (req, res, next) => {
  try {
    const allTracks = await Track.find().select("id name").exec();
    console.log(allTracks);
    return responseHandler(
      res,
      200,
      allTracks.map(({ _id, name }) => ({ trackId: _id, name })),
      "successfully fetched all tracks"
    );
  } catch (err) {
    return next(new CustomError(500, "something went wrong", err));
  }
};

module.exports = getAllTracks;
