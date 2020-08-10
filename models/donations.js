var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var donations = new Schema({
  orderid: String,
  amount     : String,
  txnid     : String,
  txndate : String,
  email: String,
  name: String,
  lname: String,
  address: String,
  address2: String,
  region: String,
  country: String,
  state: String,
  city: String,
  zip: String,
  status: String,
  gateway: String,
  mode: String,
  message: String,
});

module.exports = mongoose.model('donations', donations);