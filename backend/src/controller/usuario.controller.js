const ConexionBd = require('../config/database.js');
const { body, validationResult, param } = require('express-validator');

exports.createUsuario = [
    body('nombre').notEmpty().withMessage('El nombre es requerido').isAlpha("es-ES").withMessage("El nombre tiene que ser solo texto"),
    body('apellido').notEmpty().withMessage('Los apellidos son requeridos').isString().withMessage("Los apellidos tienen que ser solo texto"),
    body('contrasena').notEmpty().withMessage('La contraseña es requerida').isString().withMessage("La contraseña no tiene que tener caracteres especiales"),
    body('id_tipo_usuario').notEmpty().withMessage('El id del tipo de usuario es requerido').isInt({ min: 1 }).withMessage("El id del tipo de usuario debe ser un número entero positivo"),

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({error:"ha habido un problema en la subida de datos = " +errors.array()});
        }

        const { nombre, apellido, contrasena, id_tipo_usuario } = req.body;

        const sql = `CALL createUsuario(?,?,?,?)`;

        ConexionBd.query(sql, [nombre, apellido, contrasena, id_tipo_usuario], (err) => {
            if (err) {
                return res.status(500).json({error : "Ha habido un problema con el servidor = "+err});
            }
            res.status(200).json({ respuesta: "Usuario creado satisfactoriamente" });
        });
    }
];

exports.updateUsuario = [
    param('id_usuario').notEmpty().withMessage('El id del usuario es requerido').isInt({ min: 1 }).withMessage("El id del usuario debe ser un número entero positivo"),
    body('nombre').notEmpty().withMessage('El nombre es requerido').isAlpha("es-ES").withMessage("El nombre tiene que ser solo texto"),
    body('apellido').notEmpty().withMessage('Los apellidos son requeridos').isString().withMessage("Los apellidos tienen que ser solo texto"),
    body('contrasena').notEmpty().withMessage('La contraseña es requerida').isString().withMessage("La contraseña no tiene que tener caracteres especiales"),
    body('id_tipo_usuario').notEmpty().withMessage('El id del tipo de usuario es requerido').isInt({ min: 1 }).withMessage("El id del tipo de usuario debe ser un número entero positivo"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({error:"ha habido un problema en la subida de datos = " +errors.array()});
        }

        const id_usuario = req.params.id_usuario;
        const { nombre, apellido, contrasena, id_tipo_usuario } = req.body;

        const sql = `CALL updateUsuario(?,?,?)`

        ConexionBd.query(sql, [id_usuario, nombre, apellido, contrasena, id_tipo_usuario], (err) => {
            if (err) {
                return res.status(500).json({error : "Ha habido un problema con el servidor = "+err})
            }
            res.status(200).json("Usuario actualizado satisfactoriamente")
        })
    }
]

exports.getUsuarioById = [
    param('id_usuario').notEmpty().withMessage('El id del usuario es requerido').isInt({ min: 1 }).withMessage("El id del usuario debe ser un número entero positivo"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({error:"ha habido un problema en la subida de datos = " +errors.array()});
        }
        const { id_usuario } = req.params;
        const sql = `CALL getUsuarioById(?)`;
        ConexionBd.query(sql, [id_usuario], (err, response) => {
            if (err) {
                return res.status(500).json({error : "Ha habido un problema con el servidor = "+err});
            }
            if (response.length === 0) {
                return res.status(404).json({ error: "No se encontraron usuarios con el ID proporcionado" });
            }
            res.json({ usuario: response[0] });
        });
    }
];

exports.deleteUsuario = [
    param('id_usuario').notEmpty().withMessage('El id del usuario es requerido').isInt({ min: 1 }).withMessage("El id del usuario debe ser un número entero positivo"),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
      }
      const id_usuario = req.params.id_usuario;
      const sql = `call deleteUsuario(?)`;
      ConexionBd.query(sql, [id_usuario], (err) => {
        if (err) {
          return res.status(500).json({ error: "Ha ocurrido un error " + err });
        }
        res.status(200).json({ respuesta: "Se ha eliminado el usuario correctamente" })
      })
    }
]

exports.searchBarUsuario = [
    param("palabraClave").notEmpty().withMessage("La palabra clave no debe de estar vacia").isAlpha('es-ES').withMessage("Debe de ser una palabra"),
    (req,res)=>{
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({error : errors.array()})
      }
      const palabraClave = req.params.palabraClave;
      const sql  = `call searchBarUsuario(?)`;
      ConexionBd.query(sql,[palabraClave],(err,respuesta)=>{
        if(err){
          return res.status(500).json(err);
        }
        res.json({busqueda : respuesta});
      })
    }
]

exports.getUsuariosFilter20 = [
    param("page").notEmpty().withMessage("La paginacion no puede estar vacia").isInt({ min: 1 }).withMessage("La paginacion debe de ser un numero entero y positivo desde uno"),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
      }
      const page = req.params.page;
      const sql = `call getUsuariosFilter20(?)`;
      ConexionBd.query(sql, [page], (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Ha ocurrido un error " + err });
        }
        res.status(200).json({ usuarios : result })
      })
    }
]