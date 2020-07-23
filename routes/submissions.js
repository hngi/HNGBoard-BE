const router = require("express").Router();
const { authorizeAdmin } = require("../middlewares/auth");

// only admins can use all these routes,
// user can interact with submission from the user route
router.use(authorizeAdmin);

// get all submissions
router.get("/", () => {});

// get single submission
router.get("/:submissionId", () => {});

// grade a submission
router.patch("/:submissionId", () => {});

module.exports = router;
