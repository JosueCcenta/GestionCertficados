const ConexionBd = require('../config/database.js');
const { body, validationResult } = require('express-validator');
const validator = require('validator');

exports.crearAlumno = [
  body('nombre').notEmpty().withMessage('El nombre es requerido'),
  body('apellido_p').notEmpty().withMessage('El apellido paterno es requerido'),
  body('apellido_m').notEmpty().withMessage('El apellido materno es requerido'),
  body('email').isEmail().withMessage('Debe proporcionar un email válido'),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, apellido_p, apellido_m, email } = req.body;

    if (!validator.isAlpha(nombre) || !validator.isAlpha(apellido_p) || !validator.isAlpha(apellido_m) || !validator.isEmail(email)) {
      return res.status(400).json({ error: "Los campos contienen caracteres inválidos" });
    }

    const sql = `CALL createAlumno(?,?,?,?)`;

    ConexionBd.query(sql, [nombre, apellido_p, apellido_m, email], (err) => {
      if (err) {
        return res.status(500).json({ error: "Ha ocurrido un error al crear el alumno= "+err});
      }
      res.status(200).json({ respuesta: "Alumno creado satisfactoriamente" });
    });
  }
];

exports.getAlumnos = [
  (req,res)=>{
    sql=`CALL getAlumnos()`
    ConexionBd.query(sql,[],(err,response)=>{
      if(err){
        return res.status(500).json({error:"Ha ocurrido un problema: "+err})
      }
      res.json(response)
    })
  }
]