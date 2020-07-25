const { body } = require("express-validator");
const { Admin, Task } = require("../../models");
const { comparePassword } = require("../../utils/password");
const CustomError = require("../../utils/customError");
const responseHandler = require("../../utils/responseHandler");
const generateToken = require("../../utils/generateToken");
const validateMW = require("../../middlewares/validate");
const { ADMIN_SECRET } = require("../../config");

const loginAdmin = [
  body("email", "invalid email").isEmail(),
  body("password", "enter password equal to or longer than 8").isLength({
    min: 8,
  }),
  validateMW,
  async (req, res, next) => {
    try {
      const admin = await Admin.findOne({ email: req.body.email });

      if (!admin) {
        return next(
          new CustomError(403, "incorrect email/password combination")
        );
      }
      const passwordMatched = await comparePassword(
        req.body.password,
        admin.password
      );
      if (!passwordMatched) {
        return next(
          new CustomError(403, "incorrect email/password combination")
        );
      }

      const adminTasks = await Task.find({
        admins: { $elemMatch: { $eq: admin._id } },
      })
        .select("name deadline track submissions")
        .exec();

      const token = generateToken(
        { adminId: admin._id, email: req.body.email },
        ADMIN_SECRET
      );

      /* eslint-disable no-unused-vars */
      const responseObject = {
        adminId: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        adminTasks,
        token,
      };

      return responseHandler(
        res,
        200,
        responseObject,
        "successfully logged in"
      );
    } catch (err) {
      return next(new CustomError(500, "something went wrong", err));
    }
  },
];

module.exports = loginAdmin;
