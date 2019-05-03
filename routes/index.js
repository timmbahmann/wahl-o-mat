let express = require('express')

let router = express.Router()

router.get('/json', (req, res) => {
  if (req.get('content-type') === 'application/json') {
    res.json(require('../static/test.json'))
  } else {
    res.sendStatus(415)
  }
})

module.exports = router
