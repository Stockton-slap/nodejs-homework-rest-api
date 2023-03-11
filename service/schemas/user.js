const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const handleMongooseError = require("../../helpers/handleMongooseError");
const { regexp } = require("../../helpers/vars");

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: regexp,
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: String,
});

userSchema.post("save", handleMongooseError);

const User = mongoose.model("user", userSchema);

module.exports = User;
