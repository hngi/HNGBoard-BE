const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const submissionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    task: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    link: { type: String, required: true },
    comment: { type: String, required: true },
    status: {
      type: String,
      enum: ["pass", "fail", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("submission", submissionSchema);
