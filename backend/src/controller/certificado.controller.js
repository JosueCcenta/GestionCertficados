const ConexionBd = require('../config/database.js');
const { body, validationResult, param } = require('express-validator');
const validator = require('validator');

exports.crearCertificado = [
    body('id_alumno').notEmpty().withMessage('El id_alumno es requerido'),
    body('id_seminario').notEmpty().withMessage('El id_seminario es requerido'),

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id_alumno, id_seminario } = req.body;

        if (!validator.isNumeric(id_alumno) || !validator.isNumeric(id_seminario)) {
            return res.status(400).json({ error: "Los campos contienen caracteres inválidos" });
        }

        const sql = `CALL createCertificado(?,?)`;

        ConexionBd.query(sql, [id_alumno, id_seminario], (err) => {
            if (err) {
                return res.status(500).json({ error: "Ha ocurrido un error al crear el certificado= " + err });
            }
            res.status(200).json({ respuesta: "Certificado creado satisfactoriamente" });
        });
    }
];

exports.updateAlumno = [
    param('id_certificado').notEmpty().withMessage('id del certificado es requerido'),
    body('id_alumno').notEmpty().withMessage('El id_alumno es requerido'),
    body('id_seminario').notEmpty().withMessage('El id_seminario  es requerido'),

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id_certificado } = req.params;
        const { id_alumno, id_seminario } = req.body;

        if (!validator.isNumeric(id_certificado) || !validator.isNumeric(id_alumno) || !validator.isNumeric(id_seminario)) {
            return res.status(400).json({ error: "Los campos contienen caracteres inválidos" });
        }

        const sql = `CALL updateAlumno(?,?,?)`

        ConexionBd.query(sql, [id_certificado, id_alumno, id_seminario], (err) => {
            if (err) {
                return res.status(500).json({ error: "Ha habido un problemas " + err })
            }
            return res.status(200).json("Certificado actualizado satisfactoriamente")
        })
    }
]

exports.getCertificadoById = [
    param('id_alumno').notEmpty().withMessage('El id_alumno es necesario').isInt().withMessage('El id_alumno debe ser un número entero'), ,
    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        const { id_alumno } = req.params;
        if (!validator.isNumeric(id_alumno)) {
            return res.status(400).json({ error: "Los campos contienen caracteres invalidos" })
        }
        sql = `CALL getCertificadoById(?)`
        ConexionBd.query(sql, [id_alumno], (err, response) => {
            if (err) {
                return res.status(500).json({ error: "Ha ocurrido un problema: " + err })
            }
            res.json(response)
        })
    }
]