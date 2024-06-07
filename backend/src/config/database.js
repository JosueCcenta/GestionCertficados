const mysql = require('mysql2')

const connectionBd = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'certificadosescuela'
})

connectionBd.connect(function (err) {
    if (err) {
        console.error('error conectando a la base de datos: ' + err.stack);
        process.exit(1);
    }
    console.log('conectandose con el id ' + connectionBd.threadId);
});

connectionBd.on('error', function (err) {
    console.error('Error de base de datos:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('La conexión a la base de datos fue cerrada inesperadamente');
    } else {
        throw err;
    }
});


module.exports = connectionBd;
