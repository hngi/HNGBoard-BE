const router = require("express").Router();
const { createAdmin, loginAdmin } = require("../controllers/admins");

// register admin
router.post("/register", createAdmin);

// login admin
router.post("/login", loginAdmin);

module.exports = router;
