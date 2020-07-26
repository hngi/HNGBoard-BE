require("dotenv").config();
const express = require("express");
const cors = require("cors");
const YAML = require("yamljs");
const CustomError = require("./utils/customError");
const errorHandler = require("./utils/errorhandler");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = YAML.load("docs/swagger.yaml");
const morgan = require("morgan");
const {
  adminRouter,
  postRouter,
  submissionRouter,
  taskRouter,
  userRouter,
} = require("./routes");
const getAllTracks = require("./controllers/getAllTracks");
const app = express();

morgan.token("reqBody", (req) => JSON.stringify(req.body, null, 2));
// setup middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(morgan(":reqBody"));
//setup app routes
app.use("/admins", adminRouter);
app.use("/posts", postRouter);
app.use("/submissions", submissionRouter);
app.use("/tasks", taskRouter);
app.use("/users", userRouter);
app.get("/tracks", getAllTracks);

app.get("/", (req, res) => res.redirect("/docs"));

app.use(
  ["/docs", "/api/v1/docs"],
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

// Invalid route error handler
app.use("*", (req, res, next) => {
  const error = new CustomError(
    404,
    `Oops. The route ${req.method} ${req.originalUrl} is not recognised`
  );
  next(error);
});

// error handler
app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});

module.exports = app;
