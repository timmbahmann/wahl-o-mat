/**
 * @module usercontroller
 */

var User = require('../models/user.model')

async function createUser (username, password, role) {
  return new Promise((resolve, reject) =>
    User.register(
      new User({ username: username, role: role }),
      password,
      function (err, account) {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(account)
        }
      }
    )
  )
}

async function deleteUser (username) {
  console.log('delete?')
  return new Promise((resolve, reject) => {
    User.deleteOne({ username: username })
      .then(query => {
        if (query.ok) {
          resolve()
        } else {
          reject(new Error('Es wurde nichts gelöscht'))
        }
      })
      .catch(reject)
  })
}

async function updatePassword (username, oldPW, newPW) {
  return new Promise((resolve, reject) => {
    User.findOne({ username: username }).then(user => {
      console.log('user', user)
      user
        .changePassword(oldPW, newPW)
        .then(resolve)
        .catch(reject)
    })
  })
}

async function updateRole (username, role) {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate(
      { username: username },
      { role: role },
      {
        new: true,
        runValidators: true
      }
    ).then(
      user => {
        if (user === null) {
          reject(new Error('User not found'))
        } else {
          resolve(user)
        }
      },
      error => {
        reject(error)
      }
    )
  })
}

async function readAllUser () {
  return new Promise((resolve, reject) => {
    User.find({}, { _id: 0 })
      .select('username role')
      .then(resolve, reject)
  })
}

module.exports.createUser = createUser
module.exports.readAllUser = readAllUser
module.exports.updatePassword = updatePassword
module.exports.updateRole = updateRole
module.exports.deleteUser = deleteUser
