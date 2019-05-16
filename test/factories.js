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
 * @param {Boolean} random generate random wahldata or not
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

module.exports.dbQueryFromWahlObj = wahlObj => {
  let newQuery = JSON.parse(JSON.stringify(wahlObj))
  newQuery._id = 12345
  newQuery.__v = 0
  return newQuery
}

module.exports.duplicateKeyErrorQuery = () => {
  return {
    then: function (success, error) {
      return error({
        message: ['duplicate key error']
      })
    }
  }
}

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
