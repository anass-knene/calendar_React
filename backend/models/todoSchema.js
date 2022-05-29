const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
  activityName: { type: "string", required: true },
  lastName: { type: "string", required: true },
  email: { type: "string", required: true },
  password: { type: "string", required: true },
  ToDoList: { type: mongoose.Schema.Types.ObjectId, ref: "todo" },
});
