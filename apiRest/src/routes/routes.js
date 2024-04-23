const { Router } = require("express")
const router = Router()


const alumnosController = require('../controller/alumnos.controller');

module.exports = () =>{
    router.post('/alumnos/crear', alumnosController.crearCliente)
    router.get('/alumnos/buscar/:dni', alumnosController.getAlumnoByDni)
    router.get('/alumnos/listado/:page', alumnosController.getPaginacion)
    router.put('/alumnos/update/:dni', alumnosController.updateCliente)

    return router
}