const { Router } = require("express")
const router = Router()
const ConexionBd = require('../database.js');

//YA ESTA EL DE CREAR
router.post('/alumnos/crear',(req,res)=>{
    const { nombre, apellido, curso, codigoqr, dni} = req.body
    if ( !nombre || !apellido || !curso || !codigoqr || !dni) {
        return res.status(400).json({ error: "Ingresa todos los datos" });
    }
    const consulta =
        `
        CALL sp_crearCliente(?,?,?,?,?);
        `;
        ConexionBd.query(consulta, [ nombre, apellido, curso, codigoqr, dni], (err, result,fields) => {
            if (err) {
                return res.status(500).json({ error: "Error executing query" + err});
            }
            res.status(200).json({ success: "Alumno creado exitosamente" });
        });})
//Listar individual
router.get('/alumnos/buscar/:dni',(req,res)=>{
    const {dni} =req.params
    if ( !dni) {
        return res.status(400).json({ error: "Ingresa el dato a listar" });
    }
    const consulta =
    `
    CALL sp_listarClientesIndividual(?);
    `
    ConexionBd.query(consulta,[dni],(err,result,field)=>{
        if(err){
            return req.status(500).json({error: "Error executing query" + err})
        }else{
            res.json(result)
        }
    })
})
//PAGINACION
router.get('/alumnos/pageN/:page',(req,res)=>{
    const {page} = req.params
    if(!page){
        return err.status(400).json({error : "Ingresar el numero de pagina"});
    }
    const consulta = 
    `
    CALL sp_paginacion(?);
    `
    ConexionBd.query(consulta,[page],(err,result,field)=>{
        if(err){
            return req.status(500).json({error: "Error executing Query " + err})
        } else{
            res.json(result)
        }
    })
})
//ACTUALIZAR
router.put('/alumnos/update/:dni',(req,res)=>{
    const {dni} =req.params
    const { nombre, apellido, curso, codigoqr} = req.body
    if ( !nombre || !apellido || !curso || !codigoqr || !dni) {
        return res.status(400).json({ error: "Ingresa todos los datos" });
    }
    const consulta =
        `
        CALL sp_actualizarCliente(?,?,?,?,?);
        `;
    ConexionBd.query(consulta,[nombre,apellido,curso,codigoqr,dni],(err,result,field)=>{
        if(err){
            return req.status(500).json({error: "Error executing query" + err})
        }            
        res.status(200).json({ success: "Alumno actualizado exitosamente" });

    })    
})

module.exports = router