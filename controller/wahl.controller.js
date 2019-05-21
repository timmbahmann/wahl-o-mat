/**
 * Creates a new wahl
 *
 * @param data the **validated** wahl object
 * @returns a promise for the result of the database. This is the *raw* DB result
 */

let createWahl = (Wahl) => async (data) =>
  new Promise((resolve, reject) => {
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

/**
 * Get a wahl from Database from its name
 *
 * @param wahlname the wahl name
 * @returns a promise for the full **updated** wahl document
 */

let readWahl = (Wahl) => async (wahlname) =>
  new Promise((resolve, reject) =>
    Wahl.find({
        name: wahlname
    })
    .then(resolve)
    .catch(reject)
  )

/**
 * Update only the fileds specified in data
 *
 * @param data some **validated** fileds of a wahl object
 * @returns a promise for the **updated** full wahl document
 */

let updateWahl = (Wahl) => async (data) => {
  // TODO
  // Hier ist Wahl das Mongoose Model, das in wahl.model.js definiert wird
}

/**
 * Update only the fileds specified in data
 *
 * @param wahlname the name of the wahl that shoud be deleted
 * @returns a promise for `true` on success or a error message
 */

let deleteWahl = (Wahl) => async (wahlname) => {
  new Promise ((resolve, reject) => 
  Wahl.find({ name: wahlname
}))


  // TODO
  // Hier ist Wahl das Mongoose Model, das in wahl.model.js definiert wird
}

/**
 * @returns {Promise<String[]>} get all Wahl names
 */

async function readAllWahl () {
  return new Promise((resolve, reject) => {
    Wahl.find({})
      .select('name')
      .then(
        names => {
          resolve(names)
        },
        error => {
          reject(error)
        }
      )
  })
}

module.exports.createWahl = createWahl
module.exports.readWahl = readWahl
module.exports.readAllWahl = readAllWahl
module.exports.updateWahl = updateWahl
module.exports.deleteWahl = deleteWahl
