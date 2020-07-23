const router = require("express").Router();
const { authorizeUser } = require("../middlewares/auth");

// add new user
router.post("/", () => {});

router.use(authorizeUser);

// update user
router.patch("/:userId", () => {});

// submit task for user
router.post("/:userId/submissions", () => {});

// get all task for user
router.get("/:userId/tasks", () => {});

module.exports = router;
