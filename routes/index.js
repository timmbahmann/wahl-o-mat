let express = require('express')
let wahlcontroller = require('../controller/wahl.controller')
let wahlmiddleware = require('../middlewares/wahl.validate')

let router = express.Router()

/**
 * Just for test purposes. Renders a static JSON file on JSON request
 */

router.get('/json', (req, res, next) => {
  if (req.get('content-type') === 'application/json') {
    res.json(require('../static/test.json'))
  } else {
    res.status(415)
    return next(`JSON-Anfrage erwartet, aber ${req.get('content-type')} bekommen!`)
  }
})

/**
 * Gets a wahl request, validates it inside the middleware and
 * saves the data in the DB
 */

router.post('/wahl', wahlmiddleware, async (req, res, next) => {
  wahlcontroller.createWahl(req.wahl)
  .then(ergebnis => {
    res.json(ergebnis)
    next()
  })
  .catch(reason => {
    res.status(400)
    next(reason)
  })
})

module.exports = router
