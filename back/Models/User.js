let mongoose = require('mongoose')

const User = new mongoose.Schema({
  fname:String,
  lname:String,
  pwd:String,
  email:String
});

module.exports = mongoose.model('User',User)
