const { Router } = require("express")
const router = Router()

const tipo_usuarioController = require('../controller/tipo_usuario.controller')
module.exports = () => {
    router.post("/tipo-usuario/",tipo_usuarioController.createTipo_usuario);
    router.post("/tipo-usuario/getByid/:id_tipo_usuario",tipo_usuarioController.getTipo_usuarioById);
    router.put("/tipo-usuario/:id_tipo_usuario",tipo_usuarioController.updateTipo);
    router.delete("/tipo-usuario/:id_tipo_usuario",tipo_usuarioController.deleteTipo_usuario);
    return router;
}