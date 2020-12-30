module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validacao;

    const novoTerceirizado = (req,res) => {
        const dados = {...req.body};
        if(req.params.id) dados.id = req.params.id;

        try {
            existsOrError(dados.servicoprestado, "Insira o serviço que você presta");
            existsOrError(dados.area, "Informe a área que você atua");
            existsOrError(dados.equipamentos, "Insira as ferramentas de trabalho que você possui");
        } catch (error) {
            return res.status(400).send(error);
        }

        dados.ativo = true;
        
        if(dados.id) {
            app.db('terceirizados')
            .update(dados)
            .where({id: dados.id})
            .then(_ => res.status(200).send("Informações alteradas com sucesso"))
            .catch(err => res.status(500).send(err))
        } else {
            app.db('terceirizados').insert(dados).then(_ => res.status(200).send("Informação salva com sucesso"))
            .catch(err => res.status(500).send(err));
        }

    }

    const buscarTerceirizados = (req,res) => {

        app.db('terceirizados')
        .where({ativo: true})
        .then(dados => res.json(dados))
        .catch(err => res.status(500).send(err));

    }

    const buscarTerceirizadoPorId = (req,res) => {

        const id = req.params.id;

        app.db('terceirizados').where({
            id
        }).then(dados => res.json(dados))
        .catch(err => res.status(500).send(err));

    }

    return { novoTerceirizado, buscarTerceirizados, buscarTerceirizadoPorId }

}