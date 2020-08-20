var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var donations = new Schema({
  orderid:    String,
  amount:     String,
  txnid:      String,
  txndate:    String,
  email:      String,
  name:       String,
  surname:    String,
  address:    String,
  address2:   String,
  dateofbirth:String,
  country:    String,
  state:      String,
  city:       String,
  zip:        String,
  status:     String,
  gateway:    String,
  mode:       String,
  gender:     String,
});

module.exports = mongoose.model("donations", donations);
