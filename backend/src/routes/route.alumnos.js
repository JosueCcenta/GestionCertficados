const { Router } = require("express")
const router = Router()

const alumnosController = require('../controller/alumno.controller')
module.exports = () => {
    router.post('/alumno/crear-alumno',alumnosController.crearAlumno)
    router.get('/alumnos/get-alumnos', alumnosController.getAlumnos)
    return router
}