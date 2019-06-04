let usercontroller = require('../controller/user.controller')

async function deleteUser (req, res, next) {
  usercontroller
    .readAllUser()
    .then(userlist => res.json(userlist))
    .catch(next)
}

module.exports = deleteUser
