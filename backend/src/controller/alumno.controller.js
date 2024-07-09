const ConexionBd = require('../config/database.js');
const { body, validationResult, param } = require('express-validator');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

exports.crearAlumno = [
  // Validaciones para cada objeto de alumno en el arreglo
  body('*.nombre').notEmpty().withMessage('El nombre es requerido'),
  body('*.apellido_p').notEmpty().withMessage('El apellido paterno es requerido').isAlpha('es-ES', { ignore: ' ' }).withMessage('El apellido paterno debe ser un texto'),
  body('*.apellido_m').notEmpty().withMessage('El apellido materno es requerido').isAlpha('es-ES', { ignore: ' ' }).withMessage('El apellido materno debe ser un texto'),
  body('*.dni').notEmpty().withMessage('El DNI es obligatorio').isInt({ min: 1 }).withMessage('El DNI debe ser un número entero positivo').isLength({ min: 8, max: 20 }).withMessage('El DNI debe tener entre 8 y 20 caracteres'),
  body('*.email').notEmpty().withMessage('El correo no debe estar vacío').isEmail().withMessage('Debe proporcionar un email válido'),
  body('*.contrasena').notEmpty().withMessage('La contraseña no debe estar vacía'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const alumnos = Array.isArray(req.body) ? req.body : [req.body];
    const sql = `CALL createAlumno(?, ?, ?, ?, ?, ?)`; 

    const promises = alumnos.map(async (alumno) => {
      const { nombre, apellido_p, apellido_m, dni, email, contrasena } = alumno;
      const contrasenaHash = bcrypt.hashSync(contrasena, salt);


      return new Promise((resolve, reject) => {
        ConexionBd.query(sql, [nombre, apellido_p, apellido_m, email, dni, contrasenaHash], (err, result) => {
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
        res.status(200).json({ respuesta: "Alumnos creados satisfactoriamente" });
    } catch (err) {
        res.status(500).json({ error: "Ha ocurrido un error al crear los alumnos: " + err });
    }
  }
];

exports.updateAlumno = [
  param('id_alumno').notEmpty().withMessage('Id es requerido').isInt({ min: 1 }).withMessage("El id del alumno debe de ser un numero entero positivo"),
  body('nombre').notEmpty().withMessage('El nombre es requerido').isAlpha('es-ES', { ignore: ' ' }).withMessage("El nombre debe de ser un texto"),
  body('apellido_p').notEmpty().withMessage('El apellido paterno es requerido').isAlpha('es-ES', { ignore: ' ' }).withMessage("El apellido paterno debe de ser un texto"),
  body('apellido_m').notEmpty().withMessage('El apellido materno es requerido').isAlpha('es-ES', { ignore: ' ' }).withMessage("El apellido materno debe de ser un texto"),
  body('email').isEmail().withMessage('Debe proporcionar un email válido'),
  body('contrasena').notEmpty().withMessage("No puede estar vacia").isString(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id_alumno = req.params.id_alumno;
    const { nombre, apellido_p, apellido_m, email } = req.body;
    const contrasenaHash = bcrypt.hashSync(contrasena, salt);
    const sql = `call updateAlumno(?,?,?,?,?,?)`

    ConexionBd.query(sql, [id_alumno, nombre, apellido_p, apellido_m, email], (err) => {
      if (err) {
        return res.status(500).json({ error: "Ha habido un problemas " + err })
      }
      return res.status(200).json("Alumno actualizado satisfactoriamente")
    })
  }
]

exports.filterPageAlumno = [
  param("page").notEmpty().withMessage("La paginacion no puede estar vacia").isInt({ min: 1 }).withMessage("La paginacion debe de ser un numero entero y positivo desde uno"),
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
  body("id_alumno").notEmpty().withMessage("El id del alumno no puede estar vacio").isInt({ min: 1 }).withMessage("El id del alumno debe de ser un entero y positivo"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() })
    }
    console.log("Paso validacion")
    const id_alumno = req.body.id_alumno;
    console.log("Recibio parametro")
    const sql = `call deleteAlumno(?)`;
    console.log("SQL LISTo")
    ConexionBd.query(sql, [id_alumno], (err) => {
      console.log("Parametro pasado")
      if (err) {
        return res.status(500).json({ error: "Ha ocurrido un error " + err });
      }
      console.log("Sin errores")
      res.status(200).json({ respuesta: "Se ha eliminado el alumno correctamente" })
    })
  }
]

exports.searchBarAlumno = [
  param("palabraClave").notEmpty().withMessage("La palabra clave no debe de estar vacia").isAlpha('es-ES').withMessage("Debe de ser una palabra"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() })
    }
    const palabraClave = req.params.palabraClave;
    const sql = `call searchBarAlumno(?)`;
    ConexionBd.query(sql, [palabraClave], (err, respuesta) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({ busqueda: respuesta });
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
      res.json({ alumnos: response[0] })
    })
  }
]

exports.getAlumnoById = [

  body("id_alumno").notEmpty().withMessage('El id del alumno es necesario').isInt({ min: 1 }).withMessage('El id del alumno debe ser un número entero positivo'),

  (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id_alumno } = req.body;

    const sql = `CALL getAlumnoById(?)`;

    ConexionBd.query(sql, [id_alumno], (err, response) => {
      if (err) {
        return res.status(500).json({ error: "Ha ocurrido un problema al obtener el alumno: " + err });
      }

      if (response[0].length === 0) {
        return res.status(404).json({ error: "No se encontraron alumnos con el ID proporcionado" });
      }

      res.json({ alumno: response[0] });
    });
  }
];
