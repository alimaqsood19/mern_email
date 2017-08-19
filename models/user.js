const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  googleId: {
    type: String
  }
});

mongoose.model('users', userSchema);
