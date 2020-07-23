const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: { type: String, required: true },
  deadline: { type: Date, required: true },
  track: { type: Schema.Types.ObjectId, ref: "Track", required: true },
  admins: [{ type: Schema.Types.ObjectId, ref: "Admin" }],
  submissions: [{ type: Schema.Types.ObjectId, ref: "Submission" }],
});

module.exports = mongoose.model("Task", taskSchema);
