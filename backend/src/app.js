const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const configureRoutes = require("./routes/routes")
const jwt = require('jsonwebtoken')
app.set('port', process.env.PORT || 3000)
app.set('json spaces', 2)
configureRoutes(app);
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});