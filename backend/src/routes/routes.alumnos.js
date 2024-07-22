const { Router } = require("express")
const router = Router()

const alumnosController = require('../controller/alumno.controller')
module.exports = () => {
    router.post('/alumno/search/:palabraClave', alumnosController.busquedaAlumno);
    router.post('/alumno', alumnosController.createAlumno);
    router.post('/alumno/getbyid/:id_alumno',alumnosController.getAlumnoById);
    router.post('/alumno/filter/:page', alumnosController.getAlumnoFilter20);
    router.put('/alumno/:id_alumno', alumnosController.updateAlumno);
    return router
}