let express = require('express')
let path = require('path')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')

/**
 *  connect to the database
 */
mongoose.connect('mongodb+srv://website:hack-paging8-related-bema9-6talisman-cymbal-madrid8-warn@wahl-o-mat-u1xgc.mongodb.net/test?retryWrites=true', {useNewUrlParser: true})

/**
 *  use express, use port 3001 if not specified
 */
const app = express()
const PORT = process.env.PORT || 3001

/**
 *  middlewares used to get the POST parameters inside `req.body`
 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/**
 *  use the router inside the routes folder for… routing
 */
app.use(require('./routes'))

/**
 *  all files not handled by the router as static files inside the views folder
 */
app.use(express.static(path.join(__dirname, 'views')))

/**
 *  start the server
 */
app.listen(PORT, function () {
  console.log(`server started at http://localhost:${PORT}`)
  console.log('Mode:', process.env.NODE_ENV)
})

/**
 *  tell us if the database is connected
 */
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('database connected')
})
