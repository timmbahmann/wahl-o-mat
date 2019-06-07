let usercontroller = require('../controller/user.controller')

/**
 * @param {Request} req post the field `email`
 * @param {Response} res
 * @param {function (error?): void} next
 */

async function deleteUser (req, res, next) {
  console.log('delete', req.body)
  usercontroller
    .deleteUser(req.body.username)
    .then(username => res.json({ success: true, user: username }))
    .catch(next)
}

module.exports = deleteUser
