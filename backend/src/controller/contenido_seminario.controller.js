const ConexionBd = require('../config/database.js');
const { body, validationResult, param } = require('express-validator');

exports.createContenidoSeminario = [
    body("contenido").notEmpty().withMessage("El contenido no puede estar vacio"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "ha habido un problema en la subida de datos", details: errors.array() });
        }
        const contenido = req.body.contenido;
        const sql = `call createContenidoSeminario(?)`;
        ConexionBd.query(sql, [contenido], (err) => {
            if (err) {
                return res.status(500).json({ error: "Ha habido un problema con el servidor = " + err })
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
            return res.status(400).json({ error: "ha habido un problema en la subida de datos", details: errors.array() });
        }
        const id_contenido = req.params.id_contenido;
        const contenido = req.body.contenido;

        sql = `call updateContenido(?,?)`;
        ConexionBd.query(sql, [id_contenido, contenido], (err) => {
            if (err) {
                return res.status(500).json({ error: "Ha habido un problema con el servidor = " + err })
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
            return res.status(400).json({ error: "ha habido un problema en la subida de datos", details: errors.array() });
        }
        const id_contenido = req.params.id_contenido;

        sql = `call deleteContenido(?)`;
        ConexionBd.query(sql, [id_contenido], (err) => {
            if (err) {
                return res.status(500).json({ error: "Ha habido un problema con el servidor = " + err })
            }
            return res.status(200).json({ result: "Se ha eliminado el contenido" })
        })
    }
]

exports.getContenidoSeminarioById = [
    param("id_contenido_seminario").notEmpty().withMessage("El id del seminario no puede esta vacio").isInt({ min: 1 }).withMessage("El id del contenido del seminario debe de ser un numero entero y positivo"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "ha habido un problema en la subida de datos", details: errors.array() });
        }
        const id_contenido_seminario = req.params.id_contenido_seminario;
        const sql = `call getContenidoSeminarioById(?)`;
        ConexionBd.query(sql, [id_contenido_seminario], (err, response) => {
            if (err) {
                return res.status(500).json({ error: "Ha habido un problema con el servidor = " + err });
            }
            res.json({ Contenido_seminario: response })
        })
    }
]

exports.searchBarContenidoSeminario = [
    param("clave").notEmpty().withMessage("La clave no debe de estar vacia").isAlpha("es-ES").withMessage(""),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "ha habido un problema en la subida de datos", details: errors.array() });
        }
        const clave = req.params.clave;
        const sql = `call searchBarContenidoSeminario(?)`;
        ConexionBd.query(sql, [clave], (err, response) => {
            if (err) {
                return res.status(500).json({ error: "Ha habido un problema con el servidor = " + err });
            }
            res.status(200).json({ busqueda: response });
        })
    }
]

exports.getContenidoSeminarioFilter20 = [
    param("page").notEmpty().withMessage("La paginacion no puede estar vacia").isInt({ min: 1 }).withMessage("La paginacion debe de ser un numero entero y positivo desde uno"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "ha habido un problema en la subida de datos", details: errors.array() });
        }
        const page = req.params.page;
        const sql = `call getContenidoSeminarioFilter20(?)`;
        ConexionBd.query(sql, [page], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Ha ocurrido un error " + err });
            }
            res.status(200).json({ alumnos: result })
        })
    }
]
