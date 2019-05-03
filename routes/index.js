let express = require('express')

let router = express.Router()

router.get('/', (req, res) => {
  if (req.is('application/json')) {
    res.json({ Hello: 'World' })
  } else {
    res.sendStatus(415)
  }
})

module.exports = router
