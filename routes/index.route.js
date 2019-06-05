/**
 * @namespace route
 */

let express = require('express')
let langmiddleware = require('../middlewares/getlang.middleware')

let getjsonroute = require('./getjson.route')
let getwahlroute = require('./getwahl.route').getwahl
let getEveryWahlroute = require('./getwahl.route').getEveryWahl

let router = express.Router()

/**
 * Just for test purposes. Renders a static JSON file on JSON request
 * @returns {String}
 */

router.get('api/json', langmiddleware, getjsonroute)

/**
 * Get a wahl request and returns the corresponding wahl object from the database
 */

router.get('api/wahl/:wahlname', langmiddleware, getwahlroute)

/**
 * get every wahl
 */

router.get('api/wahl', langmiddleware, getEveryWahlroute)

module.exports = router
