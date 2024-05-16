const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const { Router } = require("express")
const router = Router()


const alumnosController = require('../controller/alumnos.controller');

module.exports = () =>{
    router.post('/alumnos/crear', alumnosController.crearCliente)
    router.get('/alumnos/buscar/:dni', alumnosController.getAlumnoByDni)
    router.get('/alumnos/listado/:page', alumnosController.getPaginacion)
    router.put('/alumnos/update/:dni', alumnosController.updateCliente)
    router.post('/alumnos/file',  upload.single('file'), alumnosController.uploadFile)
    router.get('/alumnos/search', alumnosController.filterAlumns)
    
    return router
}