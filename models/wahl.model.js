var mongoose = require('mongoose')

var WahlSchema = new mongoose.Schema({
  name: String,
  gremium: String,
  thesen: [{
    these: String,
    antworten: [{
      name: String,
      antwort: String
    }]
  }]
})

module.exports = mongoose.model('Wahl', WahlSchema)
