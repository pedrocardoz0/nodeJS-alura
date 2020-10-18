const LivroDao = require('../infra/livros-dao');
const db = require('../../config/database');
const { response } = require('express');

module.exports = (app) => {

    app.get('/home', (req, resp) => {
        resp.marko(
            require('../views/livros/lista/home.marko')
        );
    });
    
    app.get('/livros', (req, resp) => {

        const livroDao = new LivroDao(db);
        livroDao.lista()
            .then(livros => {
                resp.marko(
                    require('../views/livros/lista/lista.marko'),
                    {
                        livros
                    }
                );
            }).catch(erro => console.log(erro));
        
    });
}

