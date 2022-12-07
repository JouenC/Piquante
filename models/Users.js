// Importing constants
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Authentication scheme
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Application of uniqueValidator on authentication scheme
userSchema.plugin(uniqueValidator);

// module export
module.exports = mongoose.model('User', userSchema);