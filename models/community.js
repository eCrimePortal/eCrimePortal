var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var init = new Schema({
    name: String,
    email: String,
    address: String,
    address2: String,
    country: String,
    state: String,
    zip: String,
    message: String,
    subdomain: String,
    cemail: String,
    otpstat: String
});

module.exports = mongoose.model('communities', init);