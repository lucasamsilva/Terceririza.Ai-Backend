const app = require('express')();
const consign = require('consign')
const db = require('./config/db')
require('dotenv').config();

app.db = db;

consign()
    .include('./config/passport.js')
    .include('./config/middlewares.js')
    .then('./api/validacao.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app);

app.listen(process.env.PORT_MOB || 3020, () => {

})