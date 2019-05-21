let controller = require('../controller/wahl.controller')

module.exports = function updatewahlroute (req, res, next) {
  controller
    .updateWahl(req.params.wahlname, req.body.data)

    .then(function (data) {
      res.json(data)
    })

    .catch(function (error) {
      next(error)
    })
}
