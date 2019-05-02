let express = require('express')

let router = express.Router()

router.get('/', (req, res) => {
  let contype = req.headers['content-type']
  if (contype === 'application/json') {
    res.json({ Hello: 'World' })
  } else {
    res.status(415).send()
  }
})

module.exports = router
