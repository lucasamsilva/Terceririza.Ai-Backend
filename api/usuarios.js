module.exports = app => {

    const retornaUsuario = (req, res) => {

            const id = req.params.id;
    
            app.db('usuarios').where({
                id
            }).select('nome', 'telefone', 'cidade', 'UF', 'email').first().then(dados => res.json(dados))
            .catch(err => res.status(500).send(err));
    
        }

    const retornaVagasUsuario = (req,res) => {

        const usuarioId = req.params.id;

        app.db('empregos').where({
            usuarioId, ativo: true
        }).then(dados => res.json(dados))
        .catch(err => res.status(500).send(err));

    }

    return {retornaUsuario, retornaVagasUsuario}
}