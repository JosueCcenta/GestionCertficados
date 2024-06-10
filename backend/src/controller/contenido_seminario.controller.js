const ConexionBd = require('../config/database.js');
const { body, validationResult, param } = require('express-validator');

exports.createContenidoSeminario = [
    body("contenido").notEmpty().withMessage("El contenido no puede estar vacio"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }
        const contenido = req.body;
        const sql = `call createContenidoSeminario(?)`;
        ConexionBd.query(sql, [contenido], (err) => {
            if (err) {
                return res.status(500).json({ error: err })
            }
            res.status(200).json({ resultado: "Se ha creado el contenido del seminario" });
        })
    }
]

exports.updateContenidoSeminario = [
    param("id_contenido").notEmpty().withMessage("El id del seminario no puede estar vacio").isInt({ min: 1 }).withMessage("El id del contenido debe de ser positivo y entero"),
    body("contenido").notEmpty().withMessage("El contenido no puede estar vacio"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const id_contenido = req.params.id_contenido;
        const contenido = req.body;

        sql = `call updateContenido(?,?)`;
        ConexionBd.query(sql, [id_contenido, contenido], (err) => {
            if (err) {
                return res.status(500).json({ error: err })
            }
            return res.status(200).json({ result: "Se ha actualizado el contenido" })
        })
    }
]

exports.deleteContenidoSeminario = [
    param("id_contenido").notEmpty().withMessage("El id del seminario no puede estar vacio").isInt({ min: 1 }).withMessage("El id del contenido debe de ser positivo y entero"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const id_contenido = req.params.id_contenido;

        sql = `call deleteContenido(?)`;
        ConexionBd.query(sql, [id_contenido], (err) => {
            if (err) {
                return res.status(500).json({ error: err })
            }
            return res.status(200).json({ result: "Se ha eliminado el contenido" })
        })
    }
]

