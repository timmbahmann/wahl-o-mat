/**
 * @namespace route
 */

let express = require('express')
let wahlmiddleware = require('../middlewares/wahl.validate')
let langmiddleware = require('../middlewares/getlang.middleware')
let createwahlroute = require('./createwahl.route')
let getjsonroute = require('./getjson.route')
let getwahlroute = require('./getwahl.route')

let router = express.Router()

/**
 * Just for test purposes. Renders a static JSON file on JSON request
 * @returns {String}
 */

router.get('api/json', langmiddleware, getjsonroute)

/**
 * Gets a wahl request, validates it inside the middleware and
 * saves the data in the DB
 */

router.post('api/wahl', langmiddleware, wahlmiddleware, createwahlroute)

/**
 * Get a wahl request and returns the corresponding wahl object from the database
 */

router.get('api/wahl/:wahlname', langmiddleware, getwahlroute)

module.exports = router