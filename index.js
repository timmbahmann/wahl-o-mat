let express = require('express')
let path = require('path')

const app = express()
const PORT = process.env.PORT || 3001

app.use(require('./routes'))

app.use(express.static(path.join(__dirname, 'views')))

app.listen(PORT, function () {
  console.log(`server started at http://localhost:${PORT}`)
  console.log('Mode:', process.env.NODE_ENV)
})
