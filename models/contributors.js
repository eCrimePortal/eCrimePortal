var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var author = new Schema({
  name            : String,
  work     : String,
  desc     : String,
  photo : String
});

module.exports = mongoose.model('contributors', author);