module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validacao;

    const novo = (req,res) => {
        const dados = {...req.body};
        if(req.params.id) dados.id = req.params.id;

        try {
            existsOrError(dados.descricao, "Insira uma descrição para a vaga");
            existsOrError(dados.area, "Informe a área da vaga");
            existsOrError(dados.titulo, "Insira um título para a vaga");
        } catch (error) {
            return res.status(400).send(error);
        }

        dados.ativo = true;
        
        if(dados.id) {
            app.db('empregos')
            .update(dados)
            .where({id: dados.id})
            .then(_ => res.status(200).send("Vaga alterada com sucesso"))
            .catch(err => res.status(500).send(err))
        } else {
            app.db('empregos').insert(dados).then(_ => res.status(200).send("Vaga Cadastrada com Sucesso"))
            .catch(err => res.status(500).send(err));
        }

    }

    const buscarEmpregos = (req,res) => {

        app.db('empregos')
        .where({ativo: true})
        .then(dados => res.json(dados))
        .catch(err => res.status(500).send(err));

    }

    const buscarEmpregoPorId = (req,res) => {

        const id = req.params.id;

        app.db('empregos').where({
            id
        }).then(dados => res.json(dados))
        .catch(err => res.status(500).send(err));

    }

    const excluirEmprego = (req,res) => {

        const id = req.params.id;

        app.db('empregos')
        .where({id})
        .update({ativo: false})
        .then(_ => res.status(200).send("Excluido com sucesso"))
        .catch(err => res.status(500).send(err))

    }

    return {novo, buscarEmpregos, buscarEmpregoPorId, excluirEmprego}

}