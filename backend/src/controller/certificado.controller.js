const ConexionBd = require('../config/database.js');
const { body, validationResult, param } = require('express-validator');

exports.crearCertificado = [
    body('id_alumno').notEmpty().withMessage('El id_alumno es requerido').isInt({ min: 1 }).withMessage("El id del alumno debe ser un número entero positivo"),
    body('id_seminario').notEmpty().withMessage('El id_seminario es requerido').isInt({ min: 1 }).withMessage("El id del seminario debe ser un número entero positivo"),

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id_alumno, id_seminario } = req.body;

        const sql = `CALL createCertificado(?,?)`;

        ConexionBd.query(sql, [id_alumno, id_seminario], (err) => {
            if (err) {
                return res.status(500).json({ error: "Ha ocurrido un error al crear el certificado= " + err });
            }
            res.status(200).json({ respuesta: "Certificado creado satisfactoriamente" });
        });
    }
];

exports.updateCertificado = [
    param('id_certificado').notEmpty().withMessage('id del certificado es requerido').isInt({ min: 1 }).withMessage("El id del certificado debe ser un número entero positivo"),
    body('id_alumno').notEmpty().withMessage('El id_alumno es requerido').isInt({ min: 1 }).withMessage("El id del alumno debe ser un número entero positivo"),
    body('id_seminario').notEmpty().withMessage('El id_seminario  es requerido').isInt({ min: 1 }).withMessage("El id del seminario debe ser un número entero positivo"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id_certificado = req.params.id_certificado;
        const { id_alumno, id_seminario } = req.body;

        const sql = `CALL updateCertificado(?,?,?)`

        ConexionBd.query(sql, [id_certificado, id_alumno, id_seminario], (err) => {
            if (err) {
                return res.status(500).json({ error: "Ha habido un problemas " + err })
            }
            res.status(200).json("Certificado actualizado satisfactoriamente")
        })
    }
]

exports.getCertificadoById = [

    param("id_certificado").notEmpty().withMessage('El id del certificado es necesario').isInt({ min: 1 }).withMessage('El id del certificado debe ser un número entero positivo'),

    (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id_certificado } = req.params;

        const sql = `CALL getCertificadoById(?)`;

        ConexionBd.query(sql, [id_certificado], (err, response) => {
            if (err) {
                return res.status(500).json({ error: "Ha ocurrido un problema al obtener el certificado: " + err });
            }

            if (response.length === 0) {
                return res.status(404).json({ error: "No se encontraron certificados con el ID proporcionado" });
            }

            res.json({ certificado: response[0] });
        });
    }
];
