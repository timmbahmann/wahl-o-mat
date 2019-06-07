/**
 * @module usercontroller
 */

let sendmail = require('sendmail')()
var generator = require('generate-password')

var User = require('../models/user.model')

function generatePassword () {
  return generator.generate({
    length: 12,
    numbers: true
  })
}

function sendPassword (pw, mail) {
  console.log('send password')
  sendmail(
    {
      from: 'noreply@wahlomat.com',
      to: mail,
      subject: 'Dein neues Passwort',
      html: pw
    },
    function (err, reply) {
      console.log(err && err.stack)
      console.dir(reply)
    }
  )
}

async function createUser (username, role) {
  let pw = generatePassword()
  return new Promise((resolve, reject) =>
    User.register(new User({ username: username, role: role }), pw, function (
      err,
      account
    ) {
      if (err) {
        reject(new Error(err))
      } else {
        sendPassword(pw, username)
        if (username === 'root@local.host') {
          resolve({
            account: account,
            password: pw
          })
        } else {
          resolve(account)
        }
      }
    })
  )
}

async function deleteUser (username) {
  console.log('delete?', username)
  return new Promise((resolve, reject) => {
    User.deleteOne({ username: username })
      .then(query => {
        if (query.ok) {
          console.log('deleted user', username)
          resolve(username)
        } else {
          reject(new Error('Es wurde nichts gelöscht'))
        }
      })
      .catch(reject)
  })
}

async function updateOwnPassword (username, oldPW, newPW) {
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

async function updatePassword (username) {
  let pw = generatePassword()
  return new Promise((resolve, reject) => {
    User.findOne({ username: username }).then(user => {
      console.log('user', user)
      user
        .setPassword(pw)
        .then(user => {
          user.save()
          sendPassword(pw, username)
          console.log('mail sent')
          resolve()
        })
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
module.exports.updateOwnPassword = updateOwnPassword
module.exports.updateRole = updateRole
module.exports.deleteUser = deleteUser
