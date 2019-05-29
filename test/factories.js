/**
 * @module factory
 */

/**
 * Wahl dummy
 */
let WahlDummy1 = {
  name: 'Fakultätsratswahl WS 2019',
  gremium: 'Fakultätsrat',
  thesen: [
    {
      these: 'Alle Menschen sind Doof',
      antworten: [
        {
          name: 'Freitagsrunde',
          antwort: 'nein'
        },
        {
          name: 'EB301',
          antwort: 'ja'
        },
        {
          name: 'AStA',
          antwort: 'neutral'
        }
      ]
    },
    {
      these: 'Der Dekan muss weg',
      antworten: [
        {
          name: 'Freitagsrunde',
          antwort: 'ja'
        },
        {
          name: 'EB301',
          antwort: 'ja'
        },
        {
          name: 'AStA',
          antwort: 'neutral'
        }
      ]
    }
  ]
}

let WahlDummy1DB = {
  ...WahlDummy1,
  _id: 12345,
  __v: 0
}

/**
 * Gets a valid Wahl object, optional with random name and gremium
 * @param {boolean} [random=false] generate random wahldata or not. default false
 * @returns {Wahl} one valid wahl object
 */

module.exports.validWahl = random => {
  let salt = ''
  let newDummy = JSON.parse(JSON.stringify(WahlDummy1))
  if (random !== undefined && random === true) {
    salt = Math.random().toString()
  }
  newDummy.name += salt
  newDummy.gremium += salt
  return newDummy
}

/**
 * Gets a valid Wahl Query object with the then function
 * @param {boolean} [useOriginal=true] return the original object or the database one with __id and __v. default: true
 * @param {Wahl} [wahlObj={name: 'Fakultätsratswahl WS 2019', gremium: 'Fakultätsrat', thesen: [{ these: 'Alle Menschen sind Doof', antworten: [{ name: 'x', antwort: 'nein' }] }]}] create the query from this object. if omitted use WahlDummy1
 * @returns {WahlQuery} a new valid Wahl Query as it would be returned by the database
 */

module.exports.validWahlQuery = (useOriginal, wahlObj) => {
  let newDummy
  if (wahlObj !== undefined && wahlObj !== null) {
    if (useOriginal !== false) {
      newDummy = JSON.parse(JSON.stringify(wahlObj))
    } else {
      newDummy = JSON.parse(JSON.stringify({ ...wahlObj, _id: 12345, __v: 0 }))
    }
  } else {
    if (useOriginal !== false) {
      newDummy = JSON.parse(JSON.stringify(WahlDummy1))
    } else {
      newDummy = JSON.parse(JSON.stringify(WahlDummy1DB))
    }
  }
  let newerDummy = JSON.parse(JSON.stringify(newDummy))
  newDummy.then = function (success, error) {
    success(newerDummy)
  }
  return newDummy
}

/**
 * add _id and __v to the Wahl object
 * @param {Wahl} wahlObj the object to transform
 * @returns {WahlQuery} a new Query object from wahlObj
 */

module.exports.dbQueryFromWahlObj = wahlObj => {
  let newQuery = JSON.parse(JSON.stringify(wahlObj))
  newQuery._id = 12345
  newQuery.__v = 0
  return newQuery
}

/**
 * @returns {keyErrorQuery} a thenable which calls the error function with an duplicate key error
 */

module.exports.duplicateKeyErrorQuery = () => {
  return {
    then: function (success, error) {
      return error({
        message: ['duplicate key error']
      })
    }
  }
}

/**
 * the error message as it would be returned by a validation error for the path `name`
 */

module.exports.validationError = {
  errors: {
    name: {
      message: 'Name ist kein valider Name',
      type: 'Invalid name',
      path: 'name',
      name: 'ValidationError'
    }
  }
}

/**
 * @typedef {Object} Antwort one answer to one these
 * @property {String} name the name of the Liste
 * @property {'ja' | 'nein' | 'neutral'} antwort the answer to the these from the Liste
 */

/**
 * @typedef {Object} These one these as described in wahl.model.js
 * @property {String} these the value of the these
 * @property {Antwort[]} antworten
 */

/**
 * @typedef {Object} Wahl a Wahl object as described in wahl.model.js
 * @property {String} name the name of the wahl
 * @property {String} gremium the name of the wahl
 * @property {These[]} thesen an array of thesen
 */

/**
 * @typedef {Object} WahlQuery a Wahl object as described in wahl.model.js
 * @property {String} name the name of the wahl
 * @property {String} gremium the name of the wahl
 * @property {These[]} thesen an array of thesen
 * @property {Number} _id the darabase id of the object
 * @property {Number} __v the version of the object, used by the database
 */

/** the thenable then function
 * @function then
 * @param {Function} success Description
 * @param {Function} error Description
 */

/**
 * @typedef {Object} keyErrorQuery
 * @property {then} then the thenable then function
 */
