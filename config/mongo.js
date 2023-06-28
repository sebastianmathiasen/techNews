require("dotenv").config();

// MongoDB Atlas config and connect

const mongoose = require("mongoose");
const URI = process.env.DB_URI;

mongoose.connect(URI, (err) => {
    err? console.log("\033[31m" + err)
    :
    console.log("\033[32m 'Mongo Atlas connected ok'");
});

