// Conexion con base de datos Mongo Atlas de Mongo DB
require("./config/mongo");
// Con lo de abajo tomo las rutas y las formateo para cualquier sistema
const { log } = require("console");
// Servidor con Express
const express = require('express');
// Express session permite tomar datos y manipularlos mientras las seciones esten vivas
const session = require("express-session");
const auth = require("./helpers/auth");
// Requiero Handlebars
const hbs = require('express-handlebars');
// Defino axios
const axios = require("axios");
const path = require("path");
// Defino el puerto
const PORT = 3000;
// Creo la aplicacion
const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// Configuramos handlebars
app.engine('.hbs', hbs.engine({extname:"hbs"}));
// Seteamos el motor de vistas
app.set("view engine", "hbs");
// seteamos las vistas, decimos donde estan
app.set("views", path.join(__dirname, "/views"));


// Defino existencia, Monitoreo de carpeta public
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

// habilitamos la lectura de datos del body de la request
app.use(express.urlencoded({ extended: false }));

// Llamo a router
app.use("/", require("./routes/usersRt"))
;
// Peticion de tipo req hacia la raiz, puedo renderizar
app.get("/", (req, res) => {
    res.render("home", { user: req.session.user });
})

// TRAIGO NO AUTORIZADO, CORREJIR
app.get("/noAuth", (req, res) => {
    res.render("noAuth")
})

// En la de abajo llamo al router CON ROUTER
app.use("/users", require("./routes/usersRt"));


// Escucho puerto y capturo error si ocurre
app.listen(PORT, (err) => {
    !err ?
    console.log(`Server running on http://localhost:${PORT}`)
    :
    console.error(`Error launching server: ${err.code}`)
})

