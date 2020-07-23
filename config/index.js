require("dotenv").config();
module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  USER_SECRET: process.env.USER_SECRET,
  ADMIN_SECRET: process.env.ADMIN_SECRET,
  DISABLE_AUTH: process.env.DISABLE_AUTH,
};
