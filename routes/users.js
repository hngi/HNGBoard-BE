const router = require("express").Router();
const { authorizeUser } = require("../middlewares/auth");
const {
  createNewUser,
  loginUser,
  getUserTasks,
} = require("../controllers/users");
const submitTask = require("../controllers/users/submitTask");
// add new user
router.post("/register", createNewUser);

router.post("/login", loginUser);

router.use(authorizeUser);

// update user
router.patch("/:userId", () => {});

// submit task for user
router.post("/:userId/tasks/:taskId/submissions", submitTask);

// get all task for user
router.get("/:userId/tasks", getUserTasks);

module.exports = router;
