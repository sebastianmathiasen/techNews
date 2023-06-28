// Importamos dos objetos (body y validationResult) de Express-Validator
const validator = require("express-validator");
const { body, validationResult } = validator;
const User = require("../schemas/usersSchema");



// Este es el middleware con las reglas de validacion
const validationRules = [
    body("name")
        .notEmpty().withMessage("Name is required field")
        .isLength({ min: 2, max: 30 }).withMessage("Name has a minimum of 2 characters and a maximum of 30 characters").isAlpha().withMessage("Numeric characters are not accepted"),
    body("lastName")
        .notEmpty().withMessage("Lastname is required field").isLength({ min: 2, max: 30 }).withMessage("Lastname has a minimum of 2 characters and a maximum of 30 characters").isAlpha().withMessage("Numeric characters are not accepted"),
    body("email")
        .notEmpty().withMessage("Email is required field").isEmail().withMessage("You must enter a valid email"),
    body("message")
        .notEmpty().withMessage("Message is required field")
        .trim()
        .isLength({ min: 10, max: 300 }).withMessage("The message must contain between 10 and 300 characters"),

    async function (req, res, next) {

        // Vamos a hallar posibles errores de validacion en la request y los vamos a envolver en un objeto de Express-Validator que tiene funciones utiles para tratar con ellos
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const formData = req.body;
            const arrWarnings = errors.array();
            if (req.session.user) {
                const user = await User.findById(req.session.user.id).lean();
                res.render("contact", { user, arrWarnings, formData })
            }
            res.render("contact", { arrWarnings, formData })
            
        } else return next()
    }
]

const validationRules2 = [
    body("name")
        .notEmpty().withMessage("Name is required field")
        .isLength({ min: 2, max: 30 }).withMessage("Name has a minimum of 2 characters and a maximum of 30 characters").isAlpha().withMessage("Numeric characters are not accepted"),
    body("lastName")
        .notEmpty().withMessage("Lastname is required field").isLength({ min: 2, max: 30 }).withMessage("Lastname has a minimum of 2 characters and a maximum of 30 characters").isAlpha().withMessage("Numeric characters are not accepted"),
    body("email")
        .notEmpty().withMessage("Email is required field").isEmail().withMessage("You must enter a valid email"),

    async function (req, res, next) {

        // Vamos a hallar posibles errores de validacion en la request y los vamos a envolver en un objeto de Express-Validator que tiene funciones utiles para tratar con ellos
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const formData = req.body;
            const arrWarnings = errors.array();
            const user  = await User.findById(req.session.user.id).lean(); // esta ultima funcion me devuelve un json puro

            res.render("editUserForm", { arrWarnings, user })
        } else return next()
    }
]

const validationRules3 = [
    body("name")
        .notEmpty().withMessage("Name is required field")
        .isLength({ min: 2, max: 30 }).withMessage("Name has a minimum of 2 characters and a maximum of 30 characters").isAlpha().withMessage("Numeric characters are not accepted"),
    body("lastName")
        .notEmpty().withMessage("Lastname is required field").isLength({ min: 2, max: 30 }).withMessage("Lastname has a minimum of 2 characters and a maximum of 30 characters").isAlpha().withMessage("Numeric characters are not accepted"),
    body("email")
        .notEmpty().withMessage("Email is required field").isEmail().withMessage("You must enter a valid email"),

    async function (req, res, next) {

        // Vamos a hallar posibles errores de validacion en la request y los vamos a envolver en un objeto de Express-Validator que tiene funciones utiles para tratar con ellos
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const formData = req.body;
            const arrWarnings = errors.array();
            res.render("registerForm", { arrWarnings, formData })

        } else return next()
    }
]



module.exports = { validationRules, validationRules2, validationRules3 }