require('dotenv').config();
const authSecret = process.env.AUTH_SECRET;
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple')

module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validacao;

    const cadastrar = async (req, res) => {

        const usuario = { ...req.body };


        try {
            existsOrError(usuario.email, 'E-mail não informado');
            existsOrError(usuario.nome, 'Nome não informado');
            existsOrError(usuario.senha, 'Senha não informada');
            existsOrError(usuario.confirmeSenha, 'Confirmação de senha inválida')
            equalsOrError(usuario.senha, usuario.confirmeSenha, 'Senhas não conferem');

            const usuarioFromDB = await app.db('usuarios').where({ email: usuario.email }).first();
            notExistsOrError(usuarioFromDB, 'Usuário já cadastrado');
        } catch (msg) {
            return res.status(400).send(msg);
        }
        usuario.senha = await bcrypt.hash(usuario.senha, 10);
        delete usuario.confirmeSenha;
        
        app.db('usuarios').insert(usuario).then(_ => res.status(200).send("Usuário Cadastrado com Sucesso"))
            .catch(err => res.status(500).send(err));

    }

    const logar = async (req, res) => {

        const usuario = {...req.body}

        if(!usuario.email || !usuario.senha) {
            return res.status(400).send("Informe o email e a senha!")
        }

        const usuarioBanco = await app.db('usuarios').where({ email: usuario.email }).first();

        if (!usuarioBanco) return res.status(400).send("Email ou senha inválidos!");

        const checaSenha = await bcrypt.compare(usuario.senha, usuarioBanco.senha);

        if(!checaSenha) return res.status(400).send("Email ou senha inválidos!");

        const now = Math.floor(Date.now()/1000);

        const payload = {
            id: usuarioBanco.id,
            nome: usuarioBanco.nome,
            email: usuarioBanco.email,
            iat: now,
            exp: now + (60 * 60 * 24 * 365)
        }

        res.json({
            token: jwt.encode(payload, authSecret)
        })
    }

    const validarToken = async(req, res) => {
        const userData = req.body || null;
        try{
            if(userData) {
                const token = jwt.decode(userData.token, authSecret);
                if(new Date(token.exp * 1000) > new Date()){
                    return res.send(true)
                }
            }
        } catch(e) {
            //problema com o token
        }

        res.send(false)
    }

    return { cadastrar, logar, validarToken }
}