const router = require("express").Router();
const { authorizeUser, authorizeAdmin } = require("../middlewares/auth");
const {
  createNewUser,
  loginUser,
  getUserTasks,
  updateUserProfile,
} = require("../controllers/users");
const submitTask = require("../controllers/users/submitTask");
const getAllUsers = require("../controllers/admins/getAllUsers");
const getUserProfile = require("../controllers/users/getUserProfile");
// add new user
router.post("/register", createNewUser);

router.post("/login", loginUser);

// only admin can get all users
router.get("/", authorizeAdmin, getAllUsers);

router.use(authorizeUser);

// update user
router.patch("/:userId", updateUserProfile);

// submit task for user
router.post("/:userId/tasks/:taskId/submissions", submitTask);

// get all task for user
router.get("/:userId/tasks", getUserTasks);

// get user profile
router.get("/:userId/profile", getUserProfile);

module.exports = router;
