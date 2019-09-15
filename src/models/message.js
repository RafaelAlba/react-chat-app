'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  username: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  sent: Date
});

MessageSchema.path('username').validate(function (username) {
  return username.length;
}, 'Username cannot be blank');

MessageSchema.path('content').validate(function (content) {
  return content.length;
}, 'Content cannot be blank');

MessageSchema.pre('save', function(next) {
  this.sent = new Date();

  next();
});

module.exports = mongoose.model('Message', MessageSchema);
