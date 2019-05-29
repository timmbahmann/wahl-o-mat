let wahlcontroller = require('../controller/wahl.controller')

module.exports = async function (req, res, next) {
  let wahlname = decodeURI(req.params.wahlname)
  wahlcontroller
    .deleteWahl(wahlname)
    .then(() => res.json({ ok: 1 }))
    .catch(next)
}
