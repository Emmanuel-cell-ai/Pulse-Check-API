require('dotenv').config()

const express = require('express')
const app = express()
const monitorRoutes = require('./src/routes/monitorRouter.js')

app.use(express.json())

const PORT = process.env.PORT

app.use('/monitors', monitorRoutes)


app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})