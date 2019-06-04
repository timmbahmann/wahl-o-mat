let usercontroller = require('../controller/user.controller')

async function updatePassword (req, res, next) {
  usercontroller
    .updatePassword(req.body.username, req.body.oldpw, req.body.newpw)
    .then(user => {
      res.json({ success: true })
    })
    .catch(next)
}

async function updateRole (req, res, next) {
  usercontroller
    .updateRole(req.body.username, req.body.role)
    .then(user => {
      res.json(user)
    })
    .catch(next)
}

async function updateOwnPassword (req, res, next) {
  usercontroller
    .updatePassword(req.user.username, req.body.oldpw, req.body.newpw)
    .then(user => {
      res.json({ success: true })
    })
    .catch(next)
}

module.exports.password = updatePassword
module.exports.role = updateRole
module.exports.ownpassword = updateOwnPassword
