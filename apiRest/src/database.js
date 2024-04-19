const mysql = require('mysql')

const connectionBd = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'prueba'
})

connectionBd.connect(function(err){
    if(err){
        console.error('error conectando a la base de datos: ' +err.stack);
        return;
    }
    console.log('conectandose con el id ' + connectionBd.threadId);
});

module.exports = connectionBd;