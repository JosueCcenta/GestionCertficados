const routeAlumnos = require("./route.alumnos");
const routeConvert = require("./route.convert");
const routeContenido = require("./routes.contenido");
const routeInstructor = require("./routes.instructor");
const routeCertificado = require("./routes.certificado");
const routeSeminario = require("./routes.seminario");

function configureRoutes(app) {
    app.use(routeAlumnos());
    app.use(routeConvert());
    app.use(routeContenido());
    app.use(routeInstructor());
    app.use(routeCertificado());
    app.use(routeSeminario());
}

module.exports = configureRoutes;