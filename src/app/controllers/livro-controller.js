const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database')

class LivroController {

    static routes() {
        return {
            lista: '/livros',
            cadastro: '/livros/form',
            edicao: '/livros/form/:id',
            delecao: '/livros/:id'
        };
    }

    home() {
        return function (req, resp) {
            resp.marko(
                require('../views/base/home/home.marko')
            );
        }
    }

    list() {
        return function (req, resp) {

            const livroDao = new LivroDao(db);
            livroDao.lista()
                .then(livros => resp.marko(
                    require('../views/livros/lista/lista.marko'),
                    {
                        livros: livros
                    }
                ))
                .catch(erro => console.log(erro));
        }
    }

    showForm() {
        return function (req, resp) {
            resp.marko(require('../views/livros/form/form.marko'), { livro: {} });
        }
    }

    showFormById() {
        return function (req, resp) {
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
        }
    }

    update() {
        return function (req, resp) {

            const livroDao = new LivroDao(db);

            livroDao.atualiza(req.body)
                .then(resp.redirect(LivroController.routes().lista))
                .catch(erro => console.log(erro));
        }
    }

    delete() {
        return function (req, resp) {
            const id = req.params.id;

            const livroDao = new LivroDao(db);
            livroDao.remove(id)
                .then(() => resp.status(200).end())
                .catch(erro => console.log(erro));
        }
    }

    insert() {
        return function (req, resp) {

            const livroDao = new LivroDao(db);

            const erros = validationResult(req);

            if (!erros.isEmpty()) return resp.marko(
                require('../views/livros/form/form.marko'),
                {
                    livro: req.body,
                    errosValidacao: erros.array()
                }
            )

            livroDao.adiciona(req.body)
                .then(resp.redirect(LivroController.routes().lista))
                .catch(erro => console.log(erro));
        }
    }
}

module.exports = LivroController;