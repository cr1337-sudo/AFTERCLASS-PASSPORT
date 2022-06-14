const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const userSchema = new Schema({
  email: String,
  password: String,
});

userSchema.methods.encryptPass = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePass = (password1, password2) => {
  return bcrypt.compareSync(password1, password2);
};

module.exports = model("Users", userSchema);
