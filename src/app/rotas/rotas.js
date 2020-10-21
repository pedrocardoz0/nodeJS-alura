const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');
const { check, validationResult } = require('express-validator/check')

const LivroController = require('../controllers/livro-controller');
const livroController = new LivroController()

module.exports = (app) => {
    app.get('/', function(req, resp) {
        resp.marko(
            require('../views/base/home/home.marko')
        );
    });
    
    app.get('/livros', livroController.list());

    app.get('/livros/form', livroController.showForm());

    app.get('/livros/form/:id', function(req, resp) {
        const id = req.params.id;
        const livroDao = new LivroDao(db);

        livroDao.buscaPorId(id)
                .then(livro => 
                    resp.marko(
                        require('../views/livros/form/form.marko'), 
                        { livro: livro }
                    )
                )
                .catch(erro => console.log(erro));
    });

    app.post('/livros', [
        check('titulo').isLength({ min: 5 }).withMessage('O título precisa ter no mínimo 5 caracteres !'),
        check('preco').isCurrency().withMessage('O preço precisa ter um valor monetário !')
    ],function(req, resp) {
        
        const livroDao = new LivroDao(db);
        
        const erros = validationResult(req);

        if(!erros.isEmpty()) return resp.marko(
            require('../views/livros/form/form.marko'), 
            { 
                livro: req.body,
                errosValidacao: erros.array()
            }
        )

        livroDao.adiciona(req.body)
                .then(resp.redirect('/livros'))
                .catch(erro => console.log(erro));
    });

    app.put('/livros', function(req, resp) {
        
        const livroDao = new LivroDao(db);
        
        livroDao.atualiza(req.body)
                .then(resp.redirect('/livros'))
                .catch(erro => console.log(erro));
    });

    app.delete('/livros/:id', function(req, resp) {
        const id = req.params.id;

        const livroDao = new LivroDao(db);
        livroDao.remove(id)
                .then(() => resp.status(200).end())
                .catch(erro => console.log(erro));
    });
};