const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const userSchema = new Schema({
    name: {type: String, require: true},
    lastName: {type: String, require: true},
    email: {type: String, require: true, lowercase: true, trim: true, unique: true},
    password: {type: String, require: true},
    // Validaciones que el usuario no ve por cuestiones de seguridad, ej mail
    validEmail: { type: Boolean, default: false }
},
{timestamps: true} //createdAt, updatedAt
);

// Modelo para interactuar con mis datos
const User = model("User", userSchema);

module.exports = User