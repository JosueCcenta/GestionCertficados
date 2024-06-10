const ConexionBd = require('../config/database.js');
const csvJson = require('convert-csv-to-json')
let userData = []

//PAGINACION
exports.getPaginacion = (req, res) => {
    const { page } = req.params
    if (!page) {
        return err.status(400).json({ error: "Ingresar el numero de pagina" });
    }
    const consulta =
        `
    CALL sp_paginacion(?);
    `
    ConexionBd.query(consulta, [page], (err, result, field) => {
        if (err) {
            return res.status(500).json({ error: "Error executing Query " + err })
        } else {
            res.json(result)
        }
    })
}

exports.uploadFile = async (req, res) => {
    const { file } = req
    if (!file) {
        return res.status(400).json({ message: "File is required" })
    }
    if (file.mimetype !== 'text/csv') {
        return res.status(400).json({ message: 'File must be CSV' })
    }
    let json = [];
    try {
        const Csv = Buffer.from(file.buffer).toString('utf-8')
        console.log(Csv)
        json = csvJson.csvStringToJson(Csv)
        console.log("ok")
    } catch (error) {
        return res.status(500).json({ message: 'Error parsing file' })
    }
    return res.status(200).json({ data: json })
}

exports.filterAlumns = async (req, res) => {
    const { q } = req.query
    if (!q) {
        return res.status(500).json({
            message: "Query param q is required"
        })
    }
    const search = q.toString().toLowerCase()
    const filteredData = userData.filter(row => {
        return Object.values(row).some(value => value.toLowerCase().includes(search))
    })
    return res.json(200).json({
        data: filteredData
    })
}