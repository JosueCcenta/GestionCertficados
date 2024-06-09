const ConexionBd = require("../config/database");
const { body, validationResult, param } = require('express-validator');

exports.createInstructor = [
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

        ConexionBd.query(sql, [nombre, apellido_p, apellido_m], (err) => {
            if (err) {
                return res.status(500).json({ error: "Ha ocurrido un error al crear el instructor= " + err });
            }
            res.status(200).json({ respuesta: "Instructor creado satisfactoriamente" });
        })

    }
]

exports.updateInstructor = [
    param("id_instructor").notEmpty().withMessage("El id del instructor es requerido").isInt({ min: 1 }).withMessage("El id del instructor debe ser un número entero positivo"),
    body('nombre').notEmpty().withMessage('El nombre es requerido').isAlpha('es-ES', { ignore: ' ' }).withMessage("El nombre debe de ser solo texto y ser una sola palabra"),
    body('apellido_p').notEmpty().withMessage('El apellido paterno es requerido').isAlpha('es-ES', { ignore: ' ' }).withMessage("El apellido paterno debe de ser solo texto y ser una sola palabra"),
    body('apellido_m').notEmpty().withMessage('El apellido materno es requerido').isAlpha('es-ES', { ignore: ' ' }).withMessage("El apellido materno debe de ser solo texto y ser una sola palabra"),

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id_instructor = req.params.id_instructor;
        const { nombre, apellido_p, apellido_m } = req.body;

        const sql = `call updateInstructor(?,?,?)`;

        ConexionBd.query(sql, [id_instructor, nombre, apellido_p, apellido_m], (err) => {
            if (err) {
                return res.status(500).json({ error: "Ha ocurrido un error al actualizar el instructor= " + err });
            }
            res.status(200).json({ respuesta: "Instructor actualizado satisfactoriamente" });
        })

    }
]

exports.getInstructorById = [
    param("id_instructor").notEmpty().withMessage("El id del instructor es necesario").isInt({ min: 1 }).withMessage("El id del instructor debe de ser un numero entero y positivo"),
    (req, res) => {
        const id_instructor = req.params.id_instructor;
        const sql = `call getInstructorById(?)`;
        ConexionBd.query(sql, [id_instructor], (err, respuesta) => {
            if (err) {
                return res.status(500).json({ error: "Ha ocurrido un error " + err })
            }
            res.status(200).json({ instructor: respuesta })
        })
    }

]

exports.deleteInstructor = [
    param("id_instructor").notEmpty().withMessage("El id del instructor es necesario").isInt({ min: 1 }).withMessage("El id del instructor debe de ser un numero positivo entero"),
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }
        const id_instructor = req.params.id_instructor;
        const sql = `call deleteInstructor(?)`
        ConexionBd.query(sql, [id_instructor], (err) => {
            if (err) {
                return res.status(500).json({ error: "Ha ocurrido un error en la consulta" + err })
            }
            res.status(200).json({ result: "Se ha borrado el instructor con el id " + id_instructor })
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