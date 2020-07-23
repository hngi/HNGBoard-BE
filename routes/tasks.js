const router = require("express").Router();
const { authorizeAdmin } = require("../middlewares/auth");

// only admins can use all these routes,
// user can interact with submission from the user route
router.use(authorizeAdmin);

// get all tasks
router.get("/", () => {});

// get single task
router.get("/:taskId", () => {});

// add a task
router.post("/", () => {});

// update a task
router.patch("/:taskId", () => {});

module.exports = router;
