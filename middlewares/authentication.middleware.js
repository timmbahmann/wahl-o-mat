let auth = function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    next(new Error('Nicht angemeldet!'))
  }
}

module.exports = auth
