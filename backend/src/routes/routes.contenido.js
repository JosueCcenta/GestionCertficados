const { Router } = require("express")
const router = Router()
const contenidoController = require("../controller/contenido_seminario.controller");

module.exports = () => {
    router.post('/contenido', contenidoController.createContenidoSeminario);
    router.put('/contenido/:id_contenido', contenidoController.updateContenidoSeminario);
    router.delete('/contenido/:id_contenido', contenidoController.deleteContenidoSeminario);
    return router;
}