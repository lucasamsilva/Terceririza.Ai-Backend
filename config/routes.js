module.exports = app => {

    app.post('/cadastrar', app.api.autenticacao.cadastrar);
    app.post('/login', app.api.autenticacao.logar)
    app.post('/validar', app.api.autenticacao.validarToken)

}