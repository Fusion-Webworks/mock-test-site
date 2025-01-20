const mongoose = require('mongoose');
const textSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, required: true, trim: true },
    textArea: { type: String, required: true },
    id: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  });
  
module.exports = mongoose.model("adminText", textSchema);