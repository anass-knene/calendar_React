const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
  activityDate: { type: "string", required: true },
  activityName: { type: "string", required: true },
  startTime: { type: "string", required: true },
  endTime: { type: "string", required: true },
  activityDetails: { type: "string" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});
const TodoCollection = mongoose.model("todos", todoSchema);
module.exports = TodoCollection;
