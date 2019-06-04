/**
 * @namespace route
 */

let express = require('express')
let wahlmiddleware = require('../middlewares/wahl.validate')
let langmiddleware = require('../middlewares/getlang.middleware')
let authorization = require('../middlewares/authorization.middleware')
let auth = require('../middlewares/authentication.middleware')

let createwahlroute = require('./createwahl.route')
let getjsonroute = require('./getjson.route')
let getwahlroute = require('./getwahl.route').getwahl
let getEveryWahlroute = require('./getwahl.route').getEveryWahl
let updatewahlroute = require('./updatewahl.route')
let deletewahlroute = require('./deletewahl.route')
let createuserroute = require('./createuser.route')
let getEveryUserroute = require('./getuser.route')
let updateuserpasswordroute = require('./updateuser.route').password
let updateuserroleroute = require('./updateuser.route').role
let deleteuserroute = require('./deleteuser.route')

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

router.post('/wahl/:wahlname', langmiddleware, wahlmiddleware, createwahlroute)

/**
 * Get a wahl request and returns the corresponding wahl object from the database
 */

router.get('/wahl/:wahlname', langmiddleware, getwahlroute)

/**
 * get every wahl
 */

router.get('/wahl', langmiddleware, getEveryWahlroute)

/**
 * Update a wahl
 */

router.put('/wahl/:wahlname', langmiddleware, updatewahlroute)

/**
 * Delete a wahl
 */

router.delete('/wahl/:wahlname', langmiddleware, deletewahlroute)

/**
 * create a user
 */

router.post('/user', langmiddleware, createuserroute)

/**
 * get all users
 */

router.get('/user', auth, langmiddleware, getEveryUserroute)

/**
 * Update a user password
 */

router.put(
  '/user/password',
  auth,
  authorization,
  langmiddleware,
  updateuserpasswordroute
)

/**
 * Update a user role
 */

router.put('/user/role', auth, langmiddleware, updateuserroleroute)

/**
 * delete a user
 */

router.delete('/user', langmiddleware, deleteuserroute)

router.post('/login', authorization, (req, res, next) => res.json(req.json))

module.exports = router
