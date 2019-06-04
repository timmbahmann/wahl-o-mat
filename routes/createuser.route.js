let usercontroller = require('../controller/user.controller')

/**
 * @param {Request} req post the fields `email` and `password`
 * @param {Response} res
 * @param {function (error?): void} next
 */

async function createUser (req, res, next) {
  usercontroller
    .createUser(req.body.username, req.body.password, req.body.role)
    .then(user => {
      res.json({
        success: true,
        user: { username: user.username, role: user.role }
      })
    })
    .catch(next)
}

module.exports = createUser
