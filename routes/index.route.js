/**
 * @namespace route
 */

let express = require('express')
let wahlmiddleware = require('../middlewares/wahl.validate')
let langmiddleware = require('../middlewares/getlang.middleware')
let createwahlroute = require('./createwahl.route')
let getjsonroute = require('./getjson.route')
let getwahlroute = require('./getwahl.route').getwahl
let getEveryWahlroute = require('./getwahl.route').getEveryWahl
let updatewahlroute = require('./updatewahl.route')
let deletewahlroute = require('./deletewahl.route')
let createuserroute = require('./createuser.route')
let getuserroute = require('./getuser.route').getuser
let getEveryUserroute = require('./getuser.route').getEveryUser
let updateuserroute = require('./updateuser.route')
let deleteuserroute = require('./deleteuser.route')

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

router.post('api/wahl/:wahlname', langmiddleware, wahlmiddleware, createwahlroute)

/**
 * Get a wahl request and returns the corresponding wahl object from the database
 */

router.get('api/wahl/:wahlname', langmiddleware, getwahlroute)

/**
 * get every wahl
 */

router.get('api/wahl', langmiddleware, getEveryWahlroute)

/**
 * Update a wahl
 */

router.put('api/wahl/:wahlname', langmiddleware, updatewahlroute)

/**
 * Delete a wahl
 */

router.delete('api/wahl/:wahlname', langmiddleware, deletewahlroute)

/**
 * create a user
 */

router.post('api/user/:username', langmiddleware, createuserroute)

/**
 * get a user
 */

router.get('api/user/:username', langmiddleware, getuserroute)

/**
 * get all users
 */

router.get('api/user', langmiddleware, getEveryUserroute)

/**
 * Update a user
 */

router.put('api/user/:username', langmiddleware, updateuserroute)

/**
 * delete a user
 */

router.delete('api/user/:username', langmiddleware, deleteuserroute)

module.exports = router