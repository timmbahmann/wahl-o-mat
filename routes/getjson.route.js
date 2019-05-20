module.exports = (req, res, next) => {
  if (req.get('content-type') === 'application/json') {
    res.json(require('../static/test.json'))
  } else {
    res.status(415)
    return next(
      req.lang['JSON-Anfrage X erwartet, aber Y bekommen'](
        'application/json',
        req.get('content-type')
      )
    )
  }
}
