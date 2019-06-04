let auth = role =>
  function (req, res, next) {
    if (
      req.isAuthenticated() && role === 'Admin'
        ? req.user.role === 'Admin'
        : true
    ) {
      next()
    } else {
      if (req.isAuthenticated()) {
        next(new Error('Nicht genügend Rechte!'))
      } else {
        next(new Error('Nicht angemeldet!'))
      }
    }
  }

module.exports = auth
