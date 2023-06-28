const router = require("express").Router();
const news = require("../controllers/newsCt");

const mail = require("../controllers/mailCt");
const validation = require("../helpers/validationsRules");

const users = require("../controllers/userCt");
// importo middleeare pra protejer todas mis rutas
const auth = require("../helpers/auth");


router.get("/news", auth, news.loadingNews);
router.get("/", news.loadingNewsHome);

router.get("/contact", mail.getEmailForm);
router.post("/contact", validation.validationRules, mail.enviarEmail);

router.get("/login", users.getLoginForm);
router.post("/login", users.sendLoginForm);
router.get("/register", users.getRegisterForm);
router.post("/register", validation.validationRules3, users.sendRegisterForm);
router.get("/logout", auth, users.logout)
router.get("/settings", auth, users.getSettings);
router.post("/settings", auth, validation.validationRules2, users.sendSettings);
router.get("/delete", auth, users.deleteUser);
router.get("/validate", auth, users.getValidate);

module.exports = router;