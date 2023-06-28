const securePass = require("../helpers/securePassword");
const { updateOne } = require("../schemas/usersSchema");
const User = require("../schemas/usersSchema");


// Mostrar form de login
function getLoginForm(req, res, next) {
    res.render("loginForm");
};

// Procesamos form de login
async function sendLoginForm(req, res, next) {
    const {email, pass} = req.body;
    // Esto me devuelve todo el objeto completo donde esta mail
    const user = await User.find().where({ email });
    if(!user.length) {
        return res.render("loginForm", { message: "Usuario o contrasena incorrectos" })
    };

    if (await securePass.decrypt(pass, user[0].password)) {
        // Creo este objeto al realizar el login

        const usr = {
            id: user[0]._id,
            name: user[0].name,
            lastName: user[0].lastName
        }
            // Luego el objeto creado lo asigno a esta variable
        req.session.user = usr
        res.redirect("news") //{ user: `${req.session.user.name} ${req.session.user.lastName}`, id: req.session.user.id })
    } else return res.render("loginForm", { message: "Usuario o contrasena incorrectos" })
};


function getRegisterForm(req, res, next) {
    res.render("registerForm");
};

// Procesamos el Form de register --> Crear nuevo usuario
async function sendRegisterForm(req, res, next) {
    const {name, lastName, email, pass} = req.body;
    const hashedPass = await securePass.encrypt(pass);
    const newUser = new User({
        name, lastName, email, password: hashedPass
    })
    const usr = {
        id: newUser.id,
        name: newUser.name,
        lastName: newUser.lastName
    }

    newUser.save((err) => {
        if(!err) {
            req.session.user = usr
            // la linea siguente guarda los datos en memoria para no tener que loogearse en cada pagina
            res.redirect("news");
        } else {
            res.render("registerForm", {message: "Ya existe un registro con ese email"});
        }
    })
};

// mostrar settings
async function getSettings(req, res) {
    // Hago un if para que si no estoy logeado no me deje entrar a settings
    if (req.session.user) {
    // MOstarlo aca
    const user  = await User.findById(req.session.user.id).lean(); // esta ultima funcion me devuelve un json puro
    return res.render("editUserForm", {user});
    
    }
    res.send("No deberias de haber entrado, este contenido es privado")
}

// Procesar formulario de Settings
async function sendSettings(req, res) {
    const newpass = await securePass.encrypt(req.body.pass);

    try {
    // Encuentro la info por el id y actualizo (primer dato es el id, segundo dato son name: name, lastName, email)
    const newpass = await securePass.encrypt(req.body.pass);

    await User.findByIdAndUpdate(req.session.user.id, req.body);
    await User.updateOne(req.session.user.password, {password: newpass}); 
    req.session.user.name = req.body.name;
    req.session.user.lastName = req.body.lastName;
    req.session.user.email = req.body.email;
      
    const user  = await User.findById(req.session.user.id).lean(); // esta ultima funcion me devuelve un json puro
    res.render("editUserForm", { user })
    } catch (err) {
        res.render("editUserForm", { message: "Ocurrio un error, intenta nuevamente" })
}}

async function deleteUser(req, res) {
   try {
    await User.findByIdAndDelete(req.session.user.id);
    req.session.destroy();
    res.redirect("/");
   } catch (err) {
    res.render("editUserForm", { message: "Ocurrio un error, intentalo nuevamente"})
    }
}


// async function getValidate(req, res) {
//     res.send("email verification in database");
// }



function logout(req, res) {
    req.session.destroy()
    res.redirect("/");    
}

module.exports = { getLoginForm, sendLoginForm, getRegisterForm, sendRegisterForm, getSettings, sendSettings, getSettings, deleteUser, getValidate, logout }
