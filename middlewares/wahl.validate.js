
let wahlmiddleware = (req, res, next) => {
  if (req.get('content-type') !== 'application/json') {
    let err = new Error(`Erwarte JSON-Format! Gesendet: ${req.get('content-type')}`)
    err.statusCode = 415
    return next(err)
  }
  if (typeof req.body.gremium !== 'string') {
    let err = new Error('Es wurde kein Gremium spezifiziert!')
    err.statusCode = 400
    return next(err)
  }
  if (!(req.body.thesen instanceof Array) || req.body.thesen.length === 0) {
    let err = new Error('Es wurde keine Thesen übermittelt!')
    err.statusCode = 400
    return next(err)
  }
  req.body.thesen.forEach(these => {
    if (Object.prototype.toString.call(these) !== '[object Object]' ||
    typeof these.these !== 'string' ||
    !(these.antworten instanceof Array) ||
    these.antworten.length === 0) {
      let err = new Error('Die Thesen sind beschädigt!')
      err.statusCode = 400
      return next(err)
    }
    these.antworten.forEach(antwort => {
      if (Object.prototype.toString.call(antwort) !== '[object Object]' ||
      typeof antwort.name !== 'string' ||
      typeof antwort.antwort !== 'string' ||
      (antwort.antwort !== 'ja' &&
      antwort.antwort !== 'nein' &&
      antwort.antwort !== 'neutral')) {
        let err = new Error('Die Antworten sind beschädigt!')
        err.statusCode = 400
        return next(err)
      }
    })
  })
  return next()
}

module.exports = wahlmiddleware
