const { Router } = require("express")
const router = Router()

const alumnosController = require('../controller/alumno.controller')
module.exports = () => {
    router.post('/alumno/crear-alumno',alumnosController.crearAlumno)
    return router
}