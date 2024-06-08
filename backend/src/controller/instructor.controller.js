const ConexionBd = require("../config/database");
const { body, validationResult, param } = require('express-validator');

exports.crearInstructor = [
    body('nombre').notEmpty().withMessage('El nombre es requerido').isAlpha().withMessage("El nombre debe de ser solo texto y ser una sola palabra"),
    body('apellido_p').notEmpty().withMessage('El apellido paterno es requerido').isAlpha().withMessage("El apellido paterno debe de ser solo texto y ser una sola palabra"),
    body('apellido_m').notEmpty().withMessage('El apellido materno es requerido').isAlpha().withMessage("El apellido materno debe de ser solo texto y ser una sola palabra"),
    
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { nombre, apellido_p, apellido_m } = req.body;

        const sql = `call createInstructor(?,?,?)`;

        ConexionBd.query(sql, (nombre, apellido_p, apellido_m), (err) => {
            if (err) {
                return res.status(500).json({ error: "Ha ocurrido un error al crear el instructor= " + err });
            }
            res.status(200).json({ respuesta: "Instructor creado satisfactoriamente" });
        })

    }
]

exports.actualizarInstructor = [
    
]