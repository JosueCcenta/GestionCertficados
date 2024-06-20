const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const routeAlumnos = require("./routes/routes.alumnos");
const routeConvert = require("./routes/routes.convert");
const routeContenido = require("./routes/routes.contenido");
const routeInstructor = require("./routes/routes.instructor");
const routeCertificado = require("./routes/routes.certificado");
const routeSeminario = require("./routes/routes.seminario");
const tipoUsuario = require("./routes/routes.tipo_usuario");

app.set('port', process.env.PORT || 3000)
app.set('json spaces', 2)

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(routeAlumnos());
app.use(routeConvert());
app.use(routeContenido());
app.use(routeInstructor());
app.use(routeCertificado());
app.use(routeSeminario());
app.use(tipoUsuario())
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});
app.get('/hola',(req,res)=>{
    res.send("HOLA")
})