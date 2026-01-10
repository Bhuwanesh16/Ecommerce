const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    
  },
  password: {
    type: String,
    required: true,
   
  },
  role:{
    type: String,
    default: 'user'
  }
});

// Ensure the unique index only applies when userName is a string (avoids conflicts with null/missing values)
UserSchema.index({ userName: 1 }, { unique: true, partialFilterExpression: { userName: { $type: 'string' } } });

const User = mongoose.model('User', UserSchema);
module.exports = User;