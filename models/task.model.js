const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    name: { type: String, required: true },
    content: { type: String, required: true },
    deadline: { type: Date, required: true },
    track: { type: Schema.Types.ObjectId, ref: "Track", required: true },
    admins: [{ type: Schema.Types.ObjectId, ref: "Admin", required: true }],
    users: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    general: { type: Boolean, default: false, required: true },
    submissions: [
      { type: Schema.Types.ObjectId, ref: "Submission", required: true },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
