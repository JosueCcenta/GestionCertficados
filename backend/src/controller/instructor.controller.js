const ConexionBd = require("../config/database");
const { body, validationResult, param } = require('express-validator');

exports.createInstructor = [
    body('nombre').notEmpty().withMessage('El nombre es requerido').isAlpha().withMessage('El nombre debe ser solo texto y ser una sola palabra'),
    body('apellido_p').notEmpty().withMessage('El apellido paterno es requerido').isAlpha().withMessage('El apellido paterno debe ser solo texto y ser una sola palabra'),
    body('apellido_m').notEmpty().withMessage('El apellido materno es requerido').isAlpha().withMessage('El apellido materno debe ser solo texto y ser una sola palabra'),
    body('firma').notEmpty().withMessage("La firma no puede estar vacia"),

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "ha habido un problema en la subida de datos", details: errors.array() });
        }

        const { nombre, apellido_p, apellido_m, firma } = req.body;

        const sql = `CALL createInstructor(?,?,?,?)`;

        ConexionBd.query(sql, [nombre, apellido_p, apellido_m, firma], (err) => {
            if (err) {
                return res.status(500).json({ error: "Ha habido un problema con el servidor: " + err });
            }
            res.status(200).json({ respuesta: "Instructor creado satisfactoriamente" });
        });
    }
];

exports.updateInstructor = [
    param("id_instructor").notEmpty().withMessage("El id del instructor es requerido").isInt({ min: 1 }).withMessage("El id del instructor debe ser un número entero positivo"),
    body('nombre').notEmpty().withMessage('El nombre es requerido').isAlpha('es-ES', { ignore: ' ' }).withMessage("El nombre debe de ser solo texto y ser una sola palabra"),
    body('apellido_p').notEmpty().withMessage('El apellido paterno es requerido').isAlpha('es-ES', { ignore: ' ' }).withMessage("El apellido paterno debe de ser solo texto y ser una sola palabra"),
    body('apellido_m').notEmpty().withMessage('El apellido materno es requerido').isAlpha('es-ES', { ignore: ' ' }).withMessage("El apellido materno debe de ser solo texto y ser una sola palabra"),
    body('firma').notEmpty().withMessage('La firma es requerida'),

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "ha habido un problema en la subida de datos", details: errors.array() });
        }

        const id_instructor = req.params.id_instructor;
        const { nombre, apellido_p, apellido_m, firma } = req.body;

        const sql = `call updateInstructor(?,?,?,?,?)`;

        ConexionBd.query(sql, [id_instructor, nombre, apellido_p, apellido_m, firma], (err) => {
            if (err) {
                return res.status(500).json({ error: "Ha habido un problema con el servidor = " + err })
            }
            res.status(200).json({ respuesta: "Instructor actualizado satisfactoriamente" });
        })

    }
]

exports.getInstructorById = [
    param("id_instructor").notEmpty().withMessage("El id del instructor es necesario").isInt({ min: 1 }).withMessage("El id del instructor debe de ser un numero entero y positivo"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "ha habido un problema en la subida de datos", details: errors.array() });
        }
        const id_instructor = req.params.id_instructor;
        const sql = `call getInstructorById(?)`;
        ConexionBd.query(sql, [id_instructor], (err, respuesta) => {
            if (err) {
                return res.status(500).json({ error: "Ha habido un problema con el servidor = " + err })
            }
            res.status(200).json({ instructor: respuesta })
        })
    }

]

exports.deleteInstructor = [
    param("id_instructor").notEmpty().withMessage("El id del instructor es necesario").isInt({ min: 1 }).withMessage("El id del instructor debe de ser un numero positivo entero"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "ha habido un problema en la subida de datos", details: errors.array() });
        }
        const id_instructor = req.params.id_instructor;
        const sql = `call deleteInstructor(?)`
        ConexionBd.query(sql, [id_instructor], (err) => {
            if (err) {
                return res.status(500).json({ error: "Ha habido un problema con el servidor = " + err })
            }
            res.status(200).json({ result: "Se ha borrado el instructor con el id " + id_instructor })
        })
    }
]

exports.searchBarInstructor = [
    param("clave").notEmpty().withMessage("La clave no debe de estar vacia").isAlpha("es-ES").withMessage(""),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "ha habido un problema en la subida de datos", details: errors.array() });
        }
        const clave = req.params.clave;
        const sql = `call searchBarInstructor(?)`;
        ConexionBd.query(sql, [clave], (err, response) => {
            if (err) {
                return res.status(500).json({ error: "Ha habido un problema con el servidor = " + err });
            }
            res.status(200).json({ busqueda: response });
        })
    }
]

exports.getInstructors = [
    (req, res) => {
        const sql = `call getInstructores()`
        ConexionBd.query(sql, [], (err, respuesta) => {
            if (err) {
                return res.status(500).json({ error: "Ha habido un error " + err })
            }
            res.status(200).json({ instructores: respuesta })
        })
    }
]