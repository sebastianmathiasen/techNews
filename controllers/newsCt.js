const securePass = require("../helpers/securePassword");
const { updateOne } = require("../schemas/usersSchema");
const User = require("../schemas/usersSchema")


// Conexion Axios como fetch
const axios = require("axios");



let url = 'https://newsapi.org/v2/top-headlines?category=technology&category=science&language=en&language=es&apiKey=9f47ab596ba249f0904a2b8c0f15f0cc'
let data = []
let data2 = []


async function loadingNews(req, res, next) {
    if (req.session.user) {
        const user = await User.findById(req.session.user.id).lean();

        try {
            const dataNews = await axios.get(url)
            data = dataNews.data.articles;
            return res.render("news", { data , user });
            // console.log(data);
        } catch (err) {
            console.log(err);
        }
    }
    res.send("No deberias de haber entrado, este contenido es privado")
}

async function loadingNewsHome(req, res, next) {
    if (req.session.user) {
        const user = await User.findById(req.session.user.id).lean();
        try {
            const dataNews = await axios.get(url)
            data2 = dataNews.data.articles[0];
            return res.render("home", { data2, user });
            // console.log(data);
        } catch (err) {
            console.log(err);
        }
    }
    try {
        const dataNews = await axios.get(url)
        data2 = dataNews.data.articles[0];
        return res.render("home", { data2 });
        // console.log(data);
    } catch (err) {
        console.log(err);
    }
}
module.exports = { loadingNews, loadingNewsHome }