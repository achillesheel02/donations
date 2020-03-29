const mongoose = require('mongoose');


const causeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
  },
  goal: {
    type: Number,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Cause',causeSchema);
