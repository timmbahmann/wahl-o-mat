let controller = require('../controller/wahl.controller')

module.exports = function updatewahlroute (req, res, next) {
  let wahlname = decodeURI(req.params.wahlname)
  controller
    .updateWahl(wahlname, req.body)
    .then(function (data) {
      res.json(data)
    })
    .catch(function (error) {
      next(error)
    })
}
