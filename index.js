let express = require('express')

const app = express()
const PORT = process.env.PORT || 3001

app.use(require('./routes'))

app.listen(PORT, function () {
  console.log(`server started at http://localhost:${PORT}`)
})
