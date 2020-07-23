require("dotenv").config();
module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
};
