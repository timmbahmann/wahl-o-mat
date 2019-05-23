let controller = require('../controller/wahl.controller')

module.exports.getwahl = async function getwahl (req, res, next) {
  let wahlname = decodeURI(req.params.wahlname)
  // get one wahl
  controller
    .readWahl(wahlname)
    .then(value => {
      res.json(value)
      res.end()
    })
    .catch(error => {
      next(error)
    })
}

module.exports.getEveryWahl = async function getwahl (req, res, next) {
  controller
    .readAllWahl()
    .then(names => {
      res.json({ names: names })
    })
    .catch(error => {
      next(error)
    })
}
