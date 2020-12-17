module.exports = app => {

    app.get('/', (req,res)=> {
        return res.send("TerceirizaAi")
    })

    app.post('/cadastrar', app.api.autenticacao.cadastrar);
    app.post('/login', app.api.autenticacao.logar)
    app.post('/validar', app.api.autenticacao.validarToken)

}