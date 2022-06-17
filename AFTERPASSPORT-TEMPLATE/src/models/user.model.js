const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: String,
  password: String,
});

module.exports = model("Users", userSchema);
