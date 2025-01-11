const mongoose = require('mongoose');

const textSchema = new mongoose.Schema({
    subject: { type: String, requried: true },
    subtitle: { type: String, required: true },
    textArea: {type: String, required: true},
    id : { type: mongoose.Schema.Types.ObjectId, ref:"Users"}
});

module.exports = mongoose.model("adminText", textSchema);