let Wahl = require('../models/wahl.model')

/**
 * @typedef {Object} Antwort one answer to one these
 * @property {String} name the name of the Liste
 * @property {'ja' | 'nein' | 'neutral'} antwort the answer to the these from the Liste
 */

/**
 * @typedef {Object} These one these as described in wahl.model.js
 * @property {String} these the value of the these
 * @property {[Antwort]} antworten
 */

/**
 * @typedef {Object} Wahl a Wahl object as described in wahl.model.js
 * @property {String} name the name of the wahl
 * @property {String} gremium the name of the wahl
 * @property {[These]} thesen an array of thesen
 */

/**
 * Get a wahl from Database from its name
 * @param {String} wahlname the unique name of the wahl
 * @returns {Promise} a promise for the full **updated** wahl document
 */

async function readWahl (wahlname) {
  return new Promise((resolve, reject) =>
    Wahl.find({ name: wahlname }).then(resolve, reject)
  )
}

/**
 * Update only the fields specified in data
 *
 * @param wahlname wahlname the wahl name
 * @param data some **validated** fileds of a wahl object
 * @returns a promise for the **updated** full wahl document
 */

async function updateWahl (wahlname, data) {
  // TODO
  // Hier ist Wahl das Mongoose Model, das in wahl.model.js definiert wird
  return new Promise((resolve, reject) =>
    Wahl.updateOne({ name: wahlname }, data, { new: true }).then(
      val => {
        resolve(val)
      },
      error => {
        reject(new Error(error))
      }
    )
  )
}

/**
 * Update only the fileds specified in data
 *
 * @param wahlname the name of the wahl that shoud be deleted
 * @returns {Promise} a promise for `true` on success or a error message
 */

async function deleteWahl (wahlname) {
  // TODO
  // Hier ist Wahl das Mongoose Model, das in wahl.model.js definiert wird
  return new Promise((resolve, reject) =>
    Wahl.deleteOne({ name: wahlname })
      .then(query => {
        if (query.ok) {
          resolve(true)
        } else {
          reject(new Error('Es wurde nichts gelöscht'))
        }
      })
      .catch(error => {
        reject(new Error(error))
      })
  )
}

/**
 * Creates a new wahl
 *
 * @param {Wahl} data the **validated** wahl object
 * @returns {Promise<Wahl | Error>} a promise for the result of the database. This is the *raw* DB result
 */

async function createWahl (data) {
  return new Promise((resolve, reject) => {
    let newWahl = new Wahl(data)
    newWahl.save().then(
      value => resolve(value),
      reason => {
        if (reason.message.indexOf('duplicate key error') !== -1) {
          reject(new Error('Dieser Wahlname existiert bereits!'))
        } else {
          reject(reason)
        }
      }
    )
  })
}

module.exports.createWahl = createWahl
module.exports.readWahl = readWahl
module.exports.updateWahl = updateWahl
module.exports.deleteWahl = deleteWahl
