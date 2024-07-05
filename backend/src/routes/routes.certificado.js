const { Router } = require("express")
const router = Router()

const certificadoController = require('../controller/certificado.controller');

module.exports = () => {
    router.post('/certificado', certificadoController.crearCertificado);
    /**opcional */
    router.put('/certificado/:id_certificado', certificadoController.updateCertificado);
    router.post('/certificado/id=:id_certificado', certificadoController.getCertificadoById);
    return router;
}