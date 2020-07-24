const router = require("express").Router();
const { authorizeUser } = require("../middlewares/auth");
const createNewUser = require("../controllers/users/createNewUser");
const loginUser = require("../controllers/users/loginUser");
// add new user
router.post("/new", createNewUser);

router.post("/login", loginUser);

router.use(authorizeUser);

// update user
router.patch("/:userId", () => {});

// submit task for user
router.post("/:userId/submissions", () => {});

// get all task for user
router.get("/:userId/tasks", () => {});

module.exports = router;
