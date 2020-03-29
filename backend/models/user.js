const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
    username: {
      type: String,
      required: true,
      unique: true
    }}
  ,{timestamps: {
  createdAt: 'created_at',
    updatedAt: 'updated_at'
}}
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User',userSchema);
