require('dotenv').config();
const authSecret = process.env.AUTH_SECRET;
const passport = require('passport');
const passportJwt = require('passport-jwt');
const { Strategy, ExtractJwt } = passportJwt;

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) => {
        app.db('usuarios')
        .where({id: payload.id})
        .first()
        .then(usuario => done(null, usuario ? {...payload} : false))
        .catch(err => done(err,false));
    })

    passport.use(strategy);

    return {
        authenticate: () => passport.authenticate('jwt', {session: false})
    }
}