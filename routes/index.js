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
    return next(415)
  }
})

/**
 * Gets a wahl request, validates it inside the middleware and
 * saves the data in the DB
 */

router.post('/:wahlname', wahlmiddleware, async (req, res) => {
  let wahldata = {
    name: req.params.wahlname,
    gremium: req.body.gremium,
    thesen: req.body.thesen
  }

  let ergebnis = await wahlcontroller.createWahl(wahldata)
  res.json(ergebnis)
  wahlcontroller.readWahl()
})

module.exports = router
