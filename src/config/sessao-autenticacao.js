const uuid = require('uuid/v4');
const sessao = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const usuarioDao

module.exports = (app) => {
    passport.use(new LocalStrategy(
        {
            usernameField: name,
            passwordField: senha
        },
        (email, senha, done) => {
            const usuarioDao = new usuarioDao(db);
            usuarioDao.buscaPorEmail(email)
                .then(usuario => {
                    if (!usuario || senha != usuario.senha) {
                        return done(null, false, {
                            messagem: 'Login e senha incorretos!'
                        });
                    }

                    return done(null, usuario);
                })
                .catch(erro => done(erro, false));
        }
    ));
}