const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: "string", required: true },
  lastName: { type: "string", required: true },
  email: { type: "string", required: true },
  password: { type: "string", required: true },
  TodoList: { type: mongoose.Schema.Types.ObjectId, ref: "todos" },
});
const userCollection = mongoose.model("User", userSchema);
module.exports = userCollection;
