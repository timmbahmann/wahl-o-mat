let Wahl = require('../models/wahl.model')

async function createWahl (data) {
  let newWahl = new Wahl(data)
  return newWahl.save()
}

module.exports.createWahl = createWahl
