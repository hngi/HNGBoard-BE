const router = require("express").Router();
const { authorizeAdmin } = require("../middlewares/auth");

// get all posts
router.get("/", () => {});

// get single post
router.get("/:postId", () => {});

router.use(authorizeAdmin);

// add a post
router.post("/", () => {});

// update a post
router.patch("/:postId", () => {});

module.exports = router;
