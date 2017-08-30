const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  googleId: {
    type: String
  },
  credits: {
    type: Number,
    default: 0
  }
});

mongoose.model('users', userSchema);
