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
 
    app.get('/livros/form', (req, resp) => {
        resp.marko(require('../views/livros/form/form.marko'));
    });

    app.get('/livros/formUpdate', (req, resp) => {
        resp.marko(require('../views/livros/form/formUpdate.marko'))
    })

    app.post('/livros', (req, resp) => {
        console.log(req.body);

        const livroDao = new LivroDao(db);
        livroDao.insert(req.body)
            .then(resp.redirect('/livros'))
            .catch(erro => console.log(erro));
    });

    app.get('/livros/:id', (req, resp) => {
        const livroDao = new LivroDao(db);
        livroDao.searchById(req.params.id.slice(-1))
            .then(response => {
                resp.marko(
                    require('../views/livros/lista/lista.marko'),
                    {
                        livros: response
                    }
                );
            })
            .catch(error => console.log(error))
    });

    app.get('/livros/delete/:id', (req, resp) => {
        const livroDao = new LivroDao(db);
        livroDao.removeById(req.params.id.slice(-1))
            .then(resp.redirect('/livros'))
            .catch(erro => console.log(erro));
    });

    app.post('/livros/update', (req, resp) => {
        console.log(req.body);

        const livroDao = new LivroDao(db);
        livroDao.updateById(req.body)
            .then(resp.redirect('/livros'))
            .catch(erro => console.log(erro));
    });
}

