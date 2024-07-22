const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const ConvertirCsv = require("./routes/routes.convert");
const Login = require("./routes/routes.login")


const Alumnos = require("./routes/routes.alumnos");
const ContenidoSeminario = require("./routes/routes.contenido");
const Instructores = require("./routes/routes.instructor");
const Certificados = require("./routes/routes.certificado");
const Seminarios = require("./routes/routes.seminario");
const Usuarios = require("./routes/routes.usuario");
const CargosInstructores = require("./routes/route.cargoInstructor");



app.set('port', process.env.PORT || 3000)
app.set('json spaces', 2)

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(ConvertirCsv());
app.use(Login())

app.use(Alumnos());
app.use(ContenidoSeminario());
app.use(Instructores());
app.use(Certificados());
app.use(Seminarios());
app.use(Usuarios());
app.use(CargosInstructores());


app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});

app.get('/hola',(req,res)=>{
    res.send("HOLA")
})