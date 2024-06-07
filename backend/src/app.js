const express = require('express')
const app = express()
const morgan = require('morgan')
const routes = require('./routes/routes')
const cors = require('cors')
const routeAlumnos = require('./routes/route.alumnos')


app.set('port', process.env.PORT || 3000)
app.set('json spaces', 2)

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(routes());
app.use(routeAlumnos())
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});

