const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  English: { type: Boolean, default:false }, 
  Math: { type: Boolean, default:false }, 
  CS: { type: Boolean, default:false }, 
  CProg: { type: Boolean, default:false }, 
  HumanInt: { type: Boolean, default:false }, 
});


const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
<<<<<<< HEAD
  user: { type: String, enum: ["admin", "user","guest"], default: "guest" }, // Optional field
  id: { type: mongoose.Schema.Types.ObjectId, auto: true },
=======
  user: { type: String, enum: ["admin", "user"], required: true },
  subject: { type: [subjectSchema],default: [] },
  id: { type: mongoose.Schema.Types.ObjectId, auto: true},
>>>>>>> 86e34f560cbd3401c78b3053e83defcca35f8d00
});


module.exports = mongoose.model("Users", userSchema);