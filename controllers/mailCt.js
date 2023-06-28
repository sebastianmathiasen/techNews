const validationRules = require("../helpers/validationsRules.js");
const transport = require("../config/nodeMailer.js");

const securePass = require("../helpers/securePassword");
const { updateOne } = require("../schemas/usersSchema");
const User = require("../schemas/usersSchema")


// Hago esta funcion asincronica asi espera la confirmacion del mensaje enviado
// En medio de la ruta y el controlador metemos un middleware
async function getEmailForm(req, res, next) {
    if (req.session.user) {
        const user = await User.findById(req.session.user.id).lean();
        res.render("contact", {user})
    }
    res.render("contact")
}

async function enviarEmail (req, res) {
    const { name, lastName, email, message } = req.body
    const emailMsg = {
        to: "sebastianesungenio@planetatierra.com",
        from: email,
        subject: "Mensaje desde formulario de contacto",
        html: `Contacto de ${name} ${lastName}: ${message}`
    }

    // Inseguro, refactorizar con variables de entorno
    const sendMailStatus = await transport.sendMail(emailMsg);
    if (sendMailStatus.rejected.length) {
        // Variables locales viajan con request
        req.app.locals.sendMailFeedback = "El mensaje no fue enviado.";
    } else {
        req.app.locals.sendMailFeedback = "El mensaje fue enviado con exito";
    }
    // No es verdad el mensaje enviado, deberiamos esperar la respuesta del servidor
    res.redirect("/")
}


module.exports = {getEmailForm, enviarEmail}