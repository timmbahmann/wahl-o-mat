let controller = require('../controller/wahl.controller')

module.exports = async function deletewahl(req, res, next){

    controller.deleteWahl(req.params.wahlname).then(
      value => {
        res.json({ok: true})
      }
    )
    .catch(error => next(error))
}