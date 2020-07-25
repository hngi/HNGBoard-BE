const { body } = require("express-validator");
const CustomError = require("../../utils/customError");
const { Admin } = require("../../models");
const { hashPassword } = require("../../utils/password");
const responseHandler = require("../../utils/responseHandler");
const validate = require("../../middlewares/validate");
const generateToken = require("../../utils/generateToken");
const { ADMIN_SECRET } = require("../../config");

const createNewAdmin = [
  body("email", "invalid email").isEmail(),
  body("password", "enter password equal to or longer than 8").isLength({
    min: 8,
  }),
  body("firstName", "please enter a first name").not().isEmpty(),
  body("lastName", "please enter a last name").not().isEmpty(),
  validate,
  async (req, res, next) => {
    try {
      const hash = await hashPassword(req.body.password);
      const { email, firstName, lastName } = req.body;

      const admin = new Admin({
        email,
        password: hash,
        firstName,
        lastName,
      });
      await admin.save();
      const token = generateToken({ adminId: admin._id, email }, ADMIN_SECRET);
      return responseHandler(
        res,
        201,
        {
          adminId: admin._id,
          email,
          firstName,
          lastName,
          token,
        },
        "admin created successfully"
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

module.exports = createNewAdmin;
