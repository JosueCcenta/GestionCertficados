const { Router } = require("express")
const router = Router()

const usuarioController = require('../controller/usuario.controller')
module.exports = () => {
    router.post("",usuarioController.createUsuario);
    router.post("",usuarioController.getUsuarioById);
    router.post("",usuarioController.searchBarUsuario);
    router.post("",usuarioController.getUsuariosFilter20);
    router.put("",usuarioController.updateUsuario);
    router.delete("",usuarioController.deleteUsuario);

    return router
}