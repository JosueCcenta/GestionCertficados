const { Router } = require("express")
const router = Router()
const contenidoController = require("../controller/contenido_seminario.controller");

module.exports = () => {
    router.post('/contenido/', contenidoController.createContenidoSeminario);
    router.put('/contenido/:id_contenido', contenidoController.updateContenidoSeminario);
    router.delete('/contenido/:id_contenido', contenidoController.deleteContenidoSeminario);
    router.post('/contenido/getById/:id_contenido_seminario',contenidoController.getContenidoSeminarioById);
    router.post('/contenido/searchBar/:clave',contenidoController.searchBarContenidoSeminario);
    router.post('/contenido/filter/:page',contenidoController.getContenidoSeminarioFilter20);
    return router;
}   