const { Router } = require("express")
const router = Router()

const alumnosController = require('../controller/alumno.controller')
module.exports = () => {
    router.post('/alumno', alumnosController.crearAlumno);
    router.put('/alumno/:id_alumno', alumnosController.updateAlumno);
    router.put('/alumno/filter/:page', alumnosController.filterPageAlumno);
    router.delete('alumno/:id_alumno', alumnosController.deleteAlumno);
    router.post('/alumno/search/:palabraClave', alumnosController.searchBarAlumno);
    router.post('/alumno/getbyid/:id_alumno',alumnosController.getAlumnoById);
    router.get('/alumnos', alumnosController.getAlumnos)
    return router
}