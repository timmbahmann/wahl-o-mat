let controller = require('../controller/wahl.controller')

module.exports = async function getwahl (req, res, next) {
  if (req.params.wahlname) {
    // get one wahl
    controller
      .readWahl(req.params.wahlname)
      .then(value => {
        res.json(value)
        res.end()
      })
      .catch(error => {
        next(error)
      })
  } else {
    // get every wahl
    controller
      .readAllWahl()
      .then(names => {
        res.json({ names: names })
      })
      .catch(error => {
        next(error)
      })
  }
}
