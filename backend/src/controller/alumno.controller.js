const ConexionBd = require('../config/database.js');
const { body, validationResult, param } = require('express-validator');

exports.crearAlumno = [
  body('nombre').notEmpty().withMessage('El nombre es requerido').isAlpha('es-ES', { ignore: ' ' }).withMessage("El nombre debe de ser un texto"),
  body('apellido_p').notEmpty().withMessage('El apellido paterno es requerido').isAlpha('es-ES', { ignore: ' ' }).withMessage("El apellido paterno debe de ser un texto"),
  body('apellido_m').notEmpty().withMessage('El apellido materno es requerido').isAlpha('es-ES', { ignore: ' ' }).withMessage("El apellido materno debe de ser un texto"),
  body('email').isEmail().withMessage('Debe proporcionar un email válido').isAlpha('es-ES', { ignore: ' ' }).withMessage("El correo electronico debe de ser un texto"),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, apellido_p, apellido_m, email } = req.body;

    const sql = `call createAlumno(?,?,?,?)`;

    ConexionBd.query(sql, [nombre, apellido_p, apellido_m, email], (err) => {
      if (err) {
        return res.status(500).json({ error: "Ha ocurrido un error al crear el alumno= " + err });
      }
      res.status(200).json({ respuesta: "Alumno creado satisfactoriamente" });
    });
  }
];

exports.updateAlumno = [
  param('id_alumno').notEmpty().withMessage('Id es requerido').isInt({ min: 1 }).withMessage("El id del alumno debe de ser un numero entero positivo"),
  body('nombre').notEmpty().withMessage('El nombre es requerido').isAlpha('es-ES', { ignore: ' ' }).withMessage("El nombre debe de ser un texto"),
  body('apellido_p').notEmpty().withMessage('El apellido paterno es requerido').isAlpha('es-ES', { ignore: ' ' }).withMessage("El apellido paterno debe de ser un texto"),
  body('apellido_m').notEmpty().withMessage('El apellido materno es requerido').isAlpha('es-ES', { ignore: ' ' }).withMessage("El apellido materno debe de ser un texto"),
  body('email').isEmail().withMessage('Debe proporcionar un email válido').isAlpha('es-ES', { ignore: ' ' }).withMessage("El correo debe de ser un texto"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id_alumno = req.params.id_alumno;
    const { nombre, apellido_p, apellido_m, email } = req.body;

    const sql = `CALL updateAlumno(?,?,?,?,?)`

    ConexionBd.query(sql, [id_alumno, nombre, apellido_p, apellido_m, email], (err) => {
      if (err) {
        return res.status(500).json({ error: "Ha habido un problemas " + err })
      }
      return res.status(200).json("Alumno actualizado satisfactoriamente")
    })
  }
]

exports.filterAlumno = [
  param("page").notEmpty().withMessage("La paginacion no puede estar vacia").isInt({ min: 0 }).withMessage("La paginacion debe de ser un numero entero y positivo desde cero"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() })
    }
    const page = req.params.page;
    const sql = `call getAlumnosFilter20(?)`;
    ConexionBd.query(sql, [page], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Ha ocurrido un error " + err });
      }
      res.status(200).json({ alumnos: result })
    })
  }
]

exports.deleteAlumno = [
  param("id_alumno").notEmpty().withMessage("El id del alumno no puede estar vacio").isInt({ min: 1 }).withMessage("El id del alumno debe de ser un entero y positivo"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() })
    }
    const id_alumno = req.params.id_alumno;
    const sql = `call deteleAlumno(?)`;
    ConexionBd.query(sql, [id_alumno], (err) => {
      if (err) {
        return res.status(500).json({ error: "Ha ocurrido un error " + err });
      }
      res.status(200).json({ respuesta: "Se ha eliminado el alumno correctamente" })
    })
  }
]

exports.getAlumnos = [
  (req, res) => {
    sql = `call getAlumnos()`
    ConexionBd.query(sql, [], (err, response) => {
      if (err) {
        return res.status(500).json({ error: "Ha ocurrido un problema: " + err })
      }
      res.json(response)
    })
  }
]