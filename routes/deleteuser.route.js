let usercontroller = require('../controller/user.controller')

/**
 * @param {Request} req post the field `email`
 * @param {Response} res
 * @param {function (error?): void} next
 */

async function deleteUser (req, res, next) {
  console.log('delete', req.body)
  let username
  if (req.user.role === 'Editor') {
    username = req.user.username
  } else {
    if (req.body.username !== undefined) {
      username = req.body.username
    } else {
      username = req.user.username
    }
  }
  usercontroller
    .deleteUser(username)
    .then(username => res.json({ success: true, user: username }))
    .catch(next)
}

module.exports = deleteUser
