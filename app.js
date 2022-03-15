const express = require('express')
const cors = require('cors')
require('dotenv').config()
const indexRoutes = require('./routes/index')
const PORT = process.env.PORT
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/api', indexRoutes)

app.listen(PORT, () => {
  console.log(`App is listen on port ${PORT}`)
})
