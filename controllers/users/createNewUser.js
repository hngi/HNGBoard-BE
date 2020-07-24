const { body } = require("express-validator");
const { v4 } = require("uuid");
const CustomError = require("../../utils/customError");
const { User, Track } = require("../../models");
const { hashPassword } = require("../../utils/password");
const responseHandler = require("../../utils/responseHandler");
const validate = require("../../middlewares/validate");
const generateToken = require("../../utils/generateToken");
const { USER_SECRET } = require("../../config");
const generateCode = () => v4().split("-").pop();

const createNewUser = [
  body("email", "invalid email").isEmail(),
  body("password", "enter password equal to or longer than 8").isLength({
    min: 8,
  }),
  body("firstName", "please enter a first name").not().isEmpty(),
  body("lastName", "please enter a last name").not().isEmpty(),
  body("bio", "cannot be empty").not().isEmpty().optional(),
  body("userName", "cannot be empty").not().isEmpty(),
  body("location", "cannot be empty").not().isEmpty(),
  body("track", "missing track").not().isEmpty(),
  validate,
  async (req, res, next) => {
    try {
      const track = await Track.findOne({ name: req.body.track });
      const generalTrack = await Track.findOne({ name: "general" });
      const userTracks = [track, generalTrack];

      if (!track) {
        return next(new CustomError(422, "track not found"));
      }

      const hngId = generateCode();
      const hash = await hashPassword(req.body.password);
      const { email, firstName, lastName, userName, location, bio } = req.body;
      const userObject = {
        email,
        hngId,
        firstName,
        lastName,
        userName,
        location,
        currentStage: 0,
        bio,
      };
      const user = new User({
        ...userObject,
        password: hash,
        tracks: userTracks.map((track) => track._id),
      });
      await user.save();
      const token = generateToken({ userId: user._id, email }, USER_SECRET);
      return responseHandler(
        res,
        201,
        {
          ...userObject,
          userId: user._id,
          token,
          tracks: userTracks.map((track) => ({
            id: track._id,
            name: track.name,
          })),
        },
        "user created successfully"
      );
    } catch (err) {
      return next(
        new CustomError(
          500,
          "Something went wrong, please try again later",
          err
        )
      );
    }
  },
];

module.exports = createNewUser;
