// middleware que hace que mis seciones que necesiten estar loguado lo esten

const session = require("express-session");
const User = require("../schemas/usersSchema")

const auth = (req, res, next) => {
    if(req.session.user){
        console.log(req.session.user);
        next();
    } else {
        res.redirect("/noAuth")
    }
}

// Lo exporto

module.exports = auth
