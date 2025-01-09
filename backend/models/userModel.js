const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  user: { type: String, enum: ["admin", "user"], required: true },
  id: { type: mongoose.Schema.Types.ObjectId, auto: true},
});

module.exports = mongoose.model("Users", userSchema);