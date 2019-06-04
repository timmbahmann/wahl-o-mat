function isAdmin (role, userrole) {
  return role === 'Admin' ? userrole === 'Admin' : true
}

let auth = role =>
  function (req, res, next) {
    if (
      req.user !== undefined &&
      req.isAuthenticated() &&
      isAdmin(role, req.user.role)
    ) {
      console.log('user', req.isAuthenticated())
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
