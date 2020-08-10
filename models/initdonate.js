var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var init = new Schema({
  orderid: String,
  email: String,
  name: String,
  address: String
});

module.exports = mongoose.model('donations', init);