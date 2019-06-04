let express = require('express')
let path = require('path')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy
let uuid = require('uuid/v4')
let session = require('express-session')
let FileStore = require('session-file-store')(session)

const chalk = require('chalk')

/* passport config */
var User = require('./models/user.model.js')
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

/**
 * use validator on update
 */
mongoose.set('runValidators', true)
mongoose.set('useFindAndModify', false)
/**
 *  connect to the database
 */
mongoose
  .connect(
    'mongodb+srv://website:hack-paging8-related-bema9-6talisman-cymbal-' +
      'madrid8-warn@wahl-o-mat-u1xgc.mongodb.net/test?retryWrites=true',
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log(chalk.green('database connected')))
  .catch(reason =>
    console.error(chalk.red('error connecting database'), reason)
  )

/**
 *  use express, use port 3000 if not specified
 */
const app = express()
let PORT = process.env.PORT || 3000

app.use(
  session({
    genid: req => {
      console.log('Inside session middleware genid function')
      console.log(`Request object sessionID from client: ${req.sessionID}`)
      return uuid() // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: '79c0e1d879dd4404af030c0ca59b3516',
    resave: false,
    saveUninitialized: true
  })
)

app.use(passport.initialize())
app.use(passport.session())

/**
 *  middlewares used to get the POST parameters inside `req.body`
 */
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json())

/**
 *  use the router inside the routes folder for… routing
 */
app.use(require('./routes/index.route'))

/**
 *  all files not handled by the router as static files inside the public folder
 */
app.use(express.static(path.join(__dirname, 'public')))

/**
 *  start the server
 */

let server

/**
 * check all ports from 3000 to 30000 and listen to the first free one
 */

function searchPort () {
  if (PORT >= 30000) {
    console.error('no free port')
    return
  }
  server = app
    .listen(PORT, function () {
      console.log(chalk.green(`server started at http://localhost:${PORT}`))
      console.log(chalk.blue('Mode:', process.env.NODE_ENV))
    })
    .on('error', error => {
      console.error(chalk.red('error'), error.code)
      if (error.code === 'EADDRINUSE') {
        PORT++
        console.log(chalk.blue(`try port ${PORT}`))
        searchPort()
      }
    })
}

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log(
      chalk.blue(
        'Mongoose default connection is disconnected' +
          'due to application termination'
      )
    )
    server.close()
    process.exit(0)
  })
})

mongoose.connection.on('disconnected', function () {
  console.log(chalk.blue('Mongoose disconnected'))
})

mongoose.connection.on('close', function () {
  console.log(chalk.blue('Mongoose closed'))
  server.close()
  process.exit(0)
})

/**
 * Stop the server and disconnect the database
 */

function stop () {
  mongoose.connection.close()
}

searchPort()

module.exports.app = app
module.exports.stop = stop
