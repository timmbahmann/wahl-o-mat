let express = require('express')
let path = require('path')

const app = express()
const PORT = process.env.PORT || 3001

app.set('views', path.join(__dirname, 'views'))

app.use(require('./routes'))

app.listen(PORT, function () {
  console.log(`server started at http://localhost:${PORT}`)
})
