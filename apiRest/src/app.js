const express = require('express')
const app = express()
const morgan = require('morgan')
const routes = require('./routes/routes');

app.set('port',process.env.PORT || 3000)
app.set('json spaces',2)

app.use(morgan('dev'))
app.use(express.json())

app.use(routes());

app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`)
});