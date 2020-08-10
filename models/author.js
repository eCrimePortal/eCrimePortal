var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var author = new Schema({
  name            : String,
  description     : String,
  url     : String
});

module.exports = mongoose.model('authors', author);