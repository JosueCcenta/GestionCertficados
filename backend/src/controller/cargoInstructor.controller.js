const ConexionBd = require('../config/database.js');
const { body, validationResult, param } = require('express-validator');
const bcrypt = require('bcryptjs');


exports.busquedaCargoInstructor = [
    param("palabraClave").notEmpty().withMessage("La palabra clave no debe de estar vacia").isAlpha('es-ES').withMessage("Debe de ser una palabra"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }
        const palabraClave = req.params.palabraClave;
        const sql = `CALL busquedaCargoInstructor(?)`;
        ConexionBd.query(sql, [palabraClave], (err, respuesta) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.json({ busqueda: respuesta });
        })
    }
]

exports.createCargoInstructor = [
    body('*.CargoInstructor').notEmpty().withMessage('El nombre del cargo es requerido'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const cargoInstructor = Array.isArray(req.body) ? req.body : [req.body];
        const sql = `CALL createCargoInstructor(?)`;

        const promises = cargoInstructor.map(async (cargoInstructores) => {
            const { CargoInstructor } = cargoInstructores;

            return new Promise((resolve, reject) => {
                ConexionBd.query(sql, [CargoInstructor], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        });

        try {
            await Promise.all(promises);
            res.status(200).json({ respuesta: "Cargos de los instructores creados satisfactoriamente" });
        } catch (err) {
            res.status(500).json({ error: "Ha ocurrido un error al crear los cargos de intructores: " + err });
        }
    }
];

exports.getCargoInstructorById = [
    param("id_Cargo_Instructor").notEmpty().withMessage('El id del cargo del instructor es necesario').isInt({ min: 1 }).withMessage('El id del cargo del instructor es necesario'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id_Cargo_Instructor } = req.params.id_Cargo_Instructor;
        const sql = `CALL getCargoInstructorById(?)`;
        ConexionBd.query(sql, [id_Cargo_Instructor], (err, response) => {
            if (err) {
                return res.status(500).json({ error: "Ha ocurrido un problema al obtener el cargo del instructor: " + err });
            }
            if (response[0].length === 0) {
                return res.status(404).json({ error: "No se encontraron cargos con el ID proporcionado" });
            }
            res.json({ cargosEncontrados: response[0] });
        });
    }
];

exports.updateCargoInstructor = [
    param('id_cargo_instructor').notEmpty().withMessage('Id es requerido').isInt({ min: 1 }).withMessage("El id del cargo instructor debe de ser un numero entero positivo"),
    body('nombre').notEmpty().withMessage('El nombre es requerido').isAlpha('es-ES', { ignore: ' ' }).withMessage("El nombre debe de ser un texto"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id_cargo_instructor = req.params.id_cargo_instructor;
        const { nombre } = req.body;
        const sql = `CALL updateCargoInstructor(?,?)`

        ConexionBd.query(sql, [id_cargo_instructor, nombre], (err) => {
            if (err) {
                return res.status(500).json({ error: "Ha habido problemas " + err })
            }
            return res.status(200).json("Cargo actualizado satisfactoriamente")
        })
    }
];

exports.getCargoInstructor = [
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const sql = `CALL getCargoInstructor()`

        ConexionBd.query(sql,(err,result) => {
            if (err) {
                return res.status(500).json({ error: "Ha habido problemas " + err })
            }
            return res.status(200).json({response : result})
        })
    }
]
