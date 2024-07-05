const ConexionBd = require('../config/database.js');
const { body, validationResult, param } = require('express-validator');

exports.crearSeminario = [
    body("nombre_seminario").notEmpty().withMessage("El nombre del seminario es requerido").isString().withMessage("El nombre del seminario debe ser una cadena"),
    body("fecha_inicio").notEmpty().withMessage("La fecha de inicio del seminario es requerida").isISO8601().withMessage("El formato de la fecha de inicio es incorrecto"),
    body("fecha_termino").notEmpty().withMessage("La fecha de finalización del seminario es requerida").isISO8601().withMessage("El formato de la fecha de finalización es incorrecto"),
    body("horas_totales").notEmpty().withMessage("Las horas totales del curso no pueden estar vacías").isNumeric().withMessage("Las horas totales deben ser numéricas"),
    body("id_instructor").notEmpty().withMessage("El instructor no puede estar vacío").isInt({ min: 1 }).withMessage("El id del instructor debe ser numérico"),
    body("id_contenido_seminario").notEmpty().withMessage("El contenido no puede estar vacío").isInt({ min: 1 }).withMessage("El id del contenido debe ser numérico"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "ha habido un problema en la subida de datos", details: errors.array() });
        }

        const { nombre_seminario, fecha_inicio, fecha_termino, horas_totales, id_instructor, id_contenido_seminario } = req.body;

        const sql = `CALL createSeminario(?,?,?,?,?,?)`;

        ConexionBd.query(sql, [nombre_seminario, fecha_inicio, fecha_termino, horas_totales, id_instructor, id_contenido_seminario], (err) => {
            if (err) {
                return res.status(500).json({ error: "Ha ocurrido un error al crear el seminario: " + err.message });
            }
            res.status(200).json({ respuesta: "Se ha creado el seminario satisfactoriamente" });
        });
    }
];

exports.actualizarSeminario = [
    param("id_seminario").notEmpty().withMessage("El id del seminario es requerido").isInt({ min: 1 }).withMessage("El id seminario debe ser un número entero positivo"),
    body("nombre_seminario").notEmpty().withMessage("El nombre del seminario es requerido").isString().withMessage("El nombre del seminario tiene que ser un texto"),
    body("fecha_inicio").notEmpty().withMessage("La fecha de inicio del seminario es requerido").isISO8601().withMessage("El formato de fecha de inicio es incorrecto"),
    body("fecha_termino").notEmpty().withMessage("La fecha de finalización del seminario es requerida").isISO8601().withMessage("El formato de fecha de finalización es incorrecto"),
    body("horas_totales").notEmpty().withMessage("Las horas totales del curso no pueden estar vacías").isNumeric().withMessage("Las horas totales deben ser numéricas"),
    body("id_instructor").notEmpty().withMessage("El instructor no puede estar vacío").isInt({ min: 1 }).withMessage("El id del instructor debe ser numérico"),
    body("id_contenido_seminario").notEmpty().withMessage("El contenido no puede estar vacío").isInt({ min: 1 }).withMessage("El id del contenido debe ser numérico"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "ha habido un problema en la subida de datos", details: errors.array() });
        }

        const id_seminario = req.params.id_seminario;
        const { nombre_seminario, fecha_inicio, fecha_termino, horas_totales, id_instructor, id_contenido_seminario } = req.body;

        const sql = `CALL updateSeminario(?,?,?,?,?,?,?)`;

        ConexionBd.query(sql, [nombre_seminario, fecha_inicio, fecha_termino, horas_totales, id_instructor, id_seminario, id_contenido_seminario], (err) => {
            if (err) {
                return res.status(500).json({ error: "Ha ocurrido un error al actualizar el seminario: " + err.message });
            }
            res.status(200).json({ respuesta: "Se ha actualizado el seminario satisfactoriamente" });
        });
    }
];

exports.getSeminarioById = [
    param("id_seminario").notEmpty().withMessage("El id del formulario es necesario").isInt({ min: 1 }).withMessage("El id del seminario debe ser un número entero y positivo"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "ha habido un problema en la subida de datos", details: errors.array() });
        }
        const id_seminario = req.params.id_seminario;
        const sql = `call getSeminarioById(?)`;
        ConexionBd.query(sql, [id_seminario], (err, response) => {
            if (err) {
                return res.status(500).json({ error: "Ha ocurrido un error al obtener el seminario= " + err });
            }
            if (response.length === 0) {
                return res.status(404).json({ error: "No se encontró ningún seminario con el ID proporcionado" });
            }
            res.json({ seminario: response[0] });
        })
    }
]

exports.deleteSeminario = [
    param("id_seminario").notEmpty().withMessage("El id del seminario no debe de estar vacio").isInt({ min: 1 }).withMessage("El id del seminario debe de ser un numero entero y positivo"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "ha habido un problema en la subida de datos", details: errors.array() });
        }
        const id_seminario = req.params.id_seminario;
        const sql = `call deleteSeminario(?)`;
        ConexionBd.query(sql, [id_seminario], (err) => {
            if (err) {
                return res.status(500).json({ error: "Ha habido un error " + err });
            }
            res.status(200).json({ respuesta: "Fue eliminado el seminario con el id " + id_seminario });
        })
    }
]

exports.searchBarSeminario = [
    param("palabraClave").notEmpty().withMessage("La palabra clave no debe de estar vacia").isAlpha('es-ES').withMessage("Debe de ser una palabra"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "ha habido un problema en la subida de datos", details: errors.array() });
        }
        const palabraClave = req.params.palabraClave;
        const sql = `call searchBarSeminario(?)`;
        ConexionBd.query(sql, [palabraClave], (err, respuesta) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.json({ busqueda: respuesta });
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
            res.status(200).json({ seminario: result })
        })
    }
]