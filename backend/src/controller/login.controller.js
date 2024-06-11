const ConexionBD = require("../config/database");
const { body, validationResult, param } = require('express-validator');

exports.login = [
    body("usuario")
]