/**
 * @module createwahlRoute
 */

let wahlcontroller = require('../controller/wahl.controller')

/**
 * Create a new Wahl from a **validated** wahl object
 * @param {Request} req the express request with a `wahl` field
 * @param {Response} res the express response
 * @param {Next} next the express next function
 * @instance
 */
async function createWahl (req, res, next) {
  wahlcontroller
    .createWahl(req.wahl)
    .then(ergebnis => {
      res.json(ergebnis)
    })
    .catch(reason => {
      res.status(400)
      next(req.lang[reason])
    })
}

module.exports = createWahl
