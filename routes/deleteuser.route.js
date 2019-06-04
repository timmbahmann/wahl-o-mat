let usercontroller = require('../controller/user.controller')

/**
 * @param {Request} req post the field `email`
 * @param {Response} res
 * @param {function (error?): void} next
 */

async function deleteUser (req, res, next) {
  usercontroller
    .deleteUser(req.body.username)
    .then(() => res.json({ success: true }))
    .catch(next)
}

module.exports = deleteUser
