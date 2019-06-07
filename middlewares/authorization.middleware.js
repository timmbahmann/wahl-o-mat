let passport = require('passport')

let authentication = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err)
    }
    if (!user) {
      return next(new Error('Nutzer existiert nicht!'))
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err)
      }
      return res.json({ success: true })
    })
  })(req, res, next)
}

module.exports = authentication
