let express = require('express')
let Wahl = require('../models/wahl.model')
let wahlmiddleware = require('../middlewares/wahl.validate')
let langmiddleware = require('../middlewares/getlang.middleware')
let wahlcontroller = require('../controller/wahl.controller')

let router = express.Router()

/**
 * Just for test purposes. Renders a static JSON file on JSON request
 */

router.get('/api/json', langmiddleware, (req, res, next) => {
  if (req.get('content-type') === 'application/json') {
    res.json(require('../static/test.json'))
  } else {
    res.status(415)
    return next(req.lang['JSON-Anfrage X erwartet, aber Y bekommen'](
      'application/json',
      req.get('content-type')))
  }
})

/**
 * Gets a wahl request, validates it inside the middleware and
 * saves the data in the DB
 */

router.post('/api/wahl', langmiddleware, wahlmiddleware, async (req, res, next) => {
  wahlcontroller.createWahl(Wahl)(req.wahl)
  .then(ergebnis => {
    res.json(ergebnis)
    next()
  })
  .catch(reason => {
    res.status(400)
    next(req.lang[reason])
  })
})

module.exports = router
