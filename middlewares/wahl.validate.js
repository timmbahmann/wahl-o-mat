/**
 * @module wahlValidate
 */

let Wahl = require('../models/wahl.model')

/**
 * @param {Request} req The request as an Object
 * @param {Response} res Not used
 * @param {function(Error): void} next If called go to the next middleware (or to the error handler)
 * @returns {void}
 */

let wahlmiddleware = async (req, res, next) => {
  if (req.get('content-type') !== 'application/json') {
    let err = req.lang['JSON-Anfrage X erwartet, aber Y bekommen'](
      'application/json',
      req.get('content-type')
    )
    res.status(415)
    return next(err)
  }
  req.wahl = new Wahl({
    name: req.body.name,
    gremium: req.body.gremium,
    thesen: req.body.thesen
  })
  req.wahl
    .validate()
    .then(next)
    .catch(reason =>
      next(
        Object.values(reason.errors).reduce(
          (prev, curr) => curr + '\n' + prev,
          ''
        )
      )
    )
}

module.exports = wahlmiddleware
