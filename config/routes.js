module.exports = app => {

    app.get('/', (req, res) => {
        return res.send("TerceirizaAi")
    })

    app.post('/cadastrar', app.api.autenticacao.cadastrar);
    app.post('/login', app.api.autenticacao.logar)
    app.post('/validar', app.api.autenticacao.validarToken)

    app.route('/empregos')
        // .all(app.config.passport.authenticate())
        .post(app.api.empregos.novo)
        .get(app.api.empregos.buscarEmpregos)

    app.route('/empregos/:id')
        // .all(app.config.passport.authenticate())
        .get(app.api.empregos.buscarEmpregoPorId)
        .put(app.api.empregos.novo)
        .delete(app.api.empregos.excluirEmprego)

    app.route('/usuarios/:id')
        // .all(app.config.passport.authenticate())
        .get(app.api.usuarios.retornaUsuario)

    app.route('/empregos/usuario/:id')
        // .all(app.config.passport.authenticate())
        .get(app.api.usuarios.retornaVagasUsuario)

    app.route('/terceirizado')
        .get(app.api.terceirizados.buscarTerceirizados)
        .post(app.api.terceirizados.novoTerceirizado)
    
    app.route('/terceirizado/:id')
        .get(app.api.terceirizados.buscarTerceirizadoPorId)
        .put(app.api.terceirizados.novoTerceirizado)

}

