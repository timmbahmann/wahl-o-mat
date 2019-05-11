let Wahl = require('../models/wahl.model')

/**
 * Create a new wahl
 *
 * @param data the **validated** wahl object
 * @returns a promise for the result of the database. This is the *raw* DB result
 */

async function createWahl (data) {
  return new Promise((resolve, reject) => {
    let newWahl = new Wahl(data)
    newWahl.save()
    .then(value =>
      resolve(value))
    .catch(reason => {
      if (reason.message.indexOf('duplicate key error') !== -1) {
        reject('Dieser Wahlname existiert bereits!')
      } else {
        reject(reason)
      }
    })
  })
}

/**
 * Get a wahl from Database from its name
 *
 * @param wahlname the wahl name
 * @returns a promise for the full **updated** wahl document
 */

async function readWahl (wahlname) {
  // TODO Damian
}

/**
 * Update only the fileds specified in data
 *
 * @param data some **validated** fileds of a wahl object
 * @returns a promise for the **updated** full wahl document
 */

async function updateWahl (data) {
  // TODO Jonas
}

/**
 * Update only the fileds specified in data
 *
 * @param wahlname the name of the wahl that shoud be deleted
 * @returns a promise for `true` on success or a error message
 */

async function deleteWahl (wahlname) {
  // TODO Simon
}

module.exports.createWahl = createWahl
module.exports.readWahl = readWahl
module.exports.updateWahl = updateWahl
module.exports.deleteWahl = deleteWahl
