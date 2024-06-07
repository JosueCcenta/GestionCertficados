const ConexionBd = require("../config/database");

exports.crearInstructor=[
    (req,res)=>{
        body('nombre').notEmpty().withMessage('El nombre es requerido'),
        body('apellido_p').notEmpty().withMessage('El apellido paterno es requerido'),
        body('apellido_m').notEmpty().withMessage('El apellido materno es requerido'),
    }
]