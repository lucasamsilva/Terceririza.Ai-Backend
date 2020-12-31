const app = require('express')();
const consign = require('consign')
const db = require('./config/db')
require('dotenv').config();

app.db = db;

const porta = process.env.PORT_TERCEIRIZAAI_INDEX;

consign({
	cwd: process.cwd()+"/terceirizaai",
})
    .include('./config/passport.js')
    .include('./config/middlewares.js')
    .then('./api/validacao.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app);

app.listen(porta || 3000, () => {
    console.log("Rodando na porta " + porta)
})
