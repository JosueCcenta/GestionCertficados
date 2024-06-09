const { Router } = require("express")
const router = Router()

const alumnosController = require('../controller/alumno.controller')
module.exports = () => {
    router.post('/alumno', alumnosController.crearAlumno);
    router.put('/alumno/:id_alumno', alumnosController.updateAlumno);
    router.put('/alumno/filter/:page', alumnosController.filterAlumno);
    router.delete('alumno/:id_alumno', alumnosController.deleteAlumno);
    router.get('/alumnos', alumnosController.getAlumnos)
    return router
}