/**
 * @namespace route
 */

let express = require('express')
let wahlmiddleware = require('../middlewares/wahl.validate')
let langmiddleware = require('../middlewares/getlang.middleware')
let createwahlroute = require('./createwahl.route')
let getjsonroute = require('./getjson.route')
let getwahlroute = require('./getwahl.route')
let deletewahlroute = require('./deletewahl.route')
let updatewahlroute = require('./update.route')

let router = express.Router()

/**
 * Just for test purposes. Renders a static JSON file on JSON request
 * @returns {String}
 */

router.get('/json', langmiddleware, getjsonroute)

/**
 * Gets a wahl request, validates it inside the middleware and
 * saves the data in the DB
 */

router.post('/wahl', langmiddleware, wahlmiddleware, createwahlroute)

/**
 * Get a wahl request and returns the corresponding wahl object from the database
 */

router.get('/wahl/:wahlname', langmiddleware, getwahlroute)

/**
 *  deletes a wahl object
 *
 * */

router.delete('/wahl/:wahlname', langmiddleware, deletewahlroute)
/**
 * Update a wahl
 */

router.put('wahl/:wahlname', langmiddleware, updatewahlroute)

module.exports = router
