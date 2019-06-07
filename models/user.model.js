var mongoose = require('mongoose')
require('mongoose-type-email')

var Schema = mongoose.Schema

var passportLocalMongoose = require('passport-local-mongoose')

var Account = new Schema({
  username: mongoose.SchemaTypes.Email,
  password: String,
  role: {
    type: String,
    enum: ['Admin', 'Editor'],
    required: true
  }
})

Account.plugin(passportLocalMongoose)

module.exports = mongoose.model('Account', Account)
