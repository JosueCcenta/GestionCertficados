const { Router } = require("express")
const router = Router()

const cargoInstructor = require('../controller/cargoInstructor.controller')
module.exports = () => {
    router.post('/CargoInstructor/search/:palabraClave', cargoInstructor.busquedaCargoInstructor);
    router.post('/CargoInstructor', cargoInstructor.createCargoInstructor);
    router.post('/CargoInstructor/id/:id_Cargo_Instructor',cargoInstructor.getCargoInstructorById);
    router.put('/CargoInstructor/:id_alumno', cargoInstructor.updateCargoInstructor);
    router.get('/CargoInstructor/',cargoInstructor.getCargoInstructor);
    return router
}