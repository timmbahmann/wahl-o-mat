let controller = require('../controller/wahl.controller')

module.exports = async function getwahl (req, res, next) {
  controller.readWahl(req.params.wahlname).then(
    value => {
      res.json(value)
      res.end()
    },
    error => {
      next(error)
    }
  )
}
