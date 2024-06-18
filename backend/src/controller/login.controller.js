const ConexionBD = require("../config/database");
const { body, validationResult, param } = require('express-validator');

exports.loginAlumno = [
    body("param1").notEmpty().withMessage("El primer valor no puede estar vacio").isString().withMessage("I string"),
    body("param2").notEmpty().withMessage("El segundo valor no puede estar vacio").isString().withMessage("I string"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors });
        }
        const { param1, param2 } = req.body;

        ConexionBD.query(
            'CALL login_alumnos(?, ?, @resultado)',
            [param1, param2],
            (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Error interno del servidor' });
                }

                ConexionBD.query('SELECT @resultado AS resultado', (err, results) => {
                    if (err) {
                        return res.status(500).json({ error: 'Error interno del servidor' });
                    }

                    const resultado = results[0].resultado;

                    if (resultado) {
                        res.status(200).json({ mensaje: 'Autenticación exitosa' });
                    } else {
                        res.status(401).json({ error: 'Credenciales inválidas' });
                    }
                });
            }
        )
    }
]

exports.loginUsuario = [
    
]
