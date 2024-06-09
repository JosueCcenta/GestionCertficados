const { Router } = require("express")
const router = Router()
const controllerSeminario = require("../controller/seminario.controller")
module.exports = () =>{
    router.post("/seminario",controllerSeminario.crearSeminario);
    router.put("/seminario/:id_seminario",controllerSeminario.actualizarSeminario);
    router.post("/seminario/getbyid/:id_seminario",controllerSeminario.getSeminarioById);
    router.delete("/semnario/:id_seminario",controllerSeminario.deleteSeminario);
    return router
}