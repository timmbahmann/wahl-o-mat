let express = require('express')
let path = require('path')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')

mongoose.connect('mongodb+srv://website:hack-paging8-related-bema9-6talisman-cymbal-madrid8-warn@wahl-o-mat-u1xgc.mongodb.net/test?retryWrites=true', {useNewUrlParser: true})

const app = express()
const PORT = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('./routes'))

app.use(express.static(path.join(__dirname, 'views')))

app.listen(PORT, function () {
  console.log(`server started at http://localhost:${PORT}`)
  console.log('Mode:', process.env.NODE_ENV)
})

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('database connected')
})
