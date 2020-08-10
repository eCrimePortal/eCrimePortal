var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var putblog = new Schema({
  title             : String,
  description       : String,
  keywords          : String,
  category          : String,
  author            : String,
  sil               : String,
  content           : String,
  date              : String,
  ogpic             : String,
  headerpic         : String,
  url               : String,
  aurl              : String
});

module.exports = mongoose.model('blogs', putblog);