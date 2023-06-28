const nodemailer = require("nodemailer");
// import nodemailer from "nodemailer";

// Importo .env
const dotenv = require("dotenv").config();


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.userMail,
        pass: process.env.passwordMail
    }
});

module.exports = transport