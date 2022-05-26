const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: "string", required: true },
  lastName: { type: "string", required: true },
  email: { type: "string", required: true },
  password: { type: "string", required: true },
});
const userCollection = mongoose.model("User", userSchema);
module.exports = userCollection;
