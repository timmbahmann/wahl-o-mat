var mongoose = require('mongoose')

var WahlSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Ein eindeutiger Name für die Wahl wird benötigt!'],
    unique: true,
    index: true
  },
  gremium: {
    type: String,
    required: [true, 'Welches Gremium wird gewählt?']
  },
  thesen: {
    type: [
      {
        these: {
          type: String,
          required: [true, 'Eine These fehlt!']
        },
        antworten: {
          type: [
            {
              name: {
                type: String,
                required: [true, 'Ein Listenname fehlt']
              },
              antwort: {
                type: String,
                enum: {
                  values: ['ja', 'nein', 'neutral'],
                  message:
                    'Es sind nur "ja", "nein" und "neutral" als Antworten gestattet'
                },
                required: true
              }
            }
          ],
          required: [true, 'Antworten fehlen!']
        }
      }
    ],
    required: false
  }
})

module.exports = mongoose.model('Wahl', WahlSchema)
