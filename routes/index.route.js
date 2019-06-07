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
let updateownpasswordroute = require('./updateuser.route').ownpassword

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

router.post(
  '/wahl/:wahlname',
  auth('Editor'),
  langmiddleware,
  wahlmiddleware,
  createwahlroute
)

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

router.put('/wahl/:wahlname', auth('Editor'), langmiddleware, updatewahlroute)

/**
 * Delete a wahl
 */

router.delete(
  '/wahl/:wahlname',
  auth('Editor'),
  langmiddleware,
  deletewahlroute
)

/**
 * create a user
 */

router.post('/user', auth('Admin'), langmiddleware, createuserroute)

/**
 * get all users
 */

router.get('/user', auth('Admin'), langmiddleware, getEveryUserroute)

/**
 * Update a user password
 */

router.put(
  '/user/password',
  auth('Admin'),
  langmiddleware,
  updateuserpasswordroute
)

/**
 * Update own password
 */

router.put('/password', auth('Editor'), langmiddleware, updateownpasswordroute)

/**
 * Update a user role
 */

router.put('/user/role', auth('Admin'), langmiddleware, updateuserroleroute)

/**
 * delete a user
 */

router.delete('/user', auth('Editor'), langmiddleware, deleteuserroute)

/**
 * login
 */

router.post('/login', authorization, (req, res, next) => {
  res.json(req.json)
})

/**
 * logout
 */

router.post('/logout', (req, res, next) => {
  req.logout()
  res.json({ success: true })
})

module.exports = router
