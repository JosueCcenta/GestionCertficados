const ConexionBd = require("../config/database");
const { body, validationResult, param } = require("express-validator");

exports.createTipo_usuario = [
    body("nombre").notEmpty().withMessage("El nombre no puede estar vacio").isAlpha("es-ES").withMessage("El nombre tiene que ser solo texto"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "ha habido un problema en la subida de datos", details: errors.array() });
        }
        const nombre = req.body.nombre;
        sql = `call createTipo_usuario(?)`;
        ConexionBd.query(sql, [nombre], (err) => {
            if (err) {
                return res.status(500).json({ error: "Ha habido un problemas " + err })
            }
            res.status(200).json({ respuesta: "Se ha creado el tipo de usuario correctamente" });
        })
    }
];

exports.updateTipo = [
    param("id_tipo_usuario").notEmpty().withMessage("El id no puede estar vacio").isInt({ min: 1 }).withMessage("Debe de ser un numero entero y positivo"),
    body("nombre_tipo_usuario").notEmpty().withMessage("El nombre del tipo de usuario no puede estar vacio").isAlpha("es-ES").withMessage("Debe de ser una palabra"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "ha habido un problema en la subida de datos", details: errors.array() });
        }
        const id_tipo_usuario = req.params.id_tipo_usuario;
        const nombre_tipo_usuario = req.body.nombre_tipo_usuario;
        const sql = `call updateTipo_usuario(?,?)`;
        ConexionBd.query(sql, [id_tipo_usuario, nombre_tipo_usuario], (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.status(200).json({ result: "Se ha actualizado correctamente el tipo de usuario" });
        })
    }
];

exports.getTipo_usuarioById = [
    param("id_tipo").notEmpty().withMessage("El id no puede estar vacio").isInt({ min: 1 }).withMessage("El id debe de ser positivo y entero"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "ha habido un problema en la subida de datos", details: errors.array() });
        }
        const id_tipo = req.params.id_tipo;
        const sql = `call getTipo_usuarioById(?)`;
        ConexionBd.query(sql, [id_tipo], (err, respuesta) => {
            if (err) {
                return res.status(400).json({ error: err });
            }
            res.status(200).json({ tipo: respuesta });
        });
    }
];

exports.deleteTipo_usuario = [
    param("id_tipo_usuario").notEmpty().withMessage("El id no puede estar vacio").isInt({ min: 1 }).withMessage("El id debe de ser positivo y entero"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "ha habido un problema en la subida de datos", details: errors.array() });
        }
        const id_tipo_usuario = req.params.id_tipo_usuario;
        const sql = `call deleteTipo_usuario(?)`;
        ConexionBd.query(sql, [id_tipo_usuario], (err, respuesta) => {
            if (err) {
                return res.status(400).json({ error: err })
            }
            res.status(200).json({ tipo: respuesta })
        })
    }
];