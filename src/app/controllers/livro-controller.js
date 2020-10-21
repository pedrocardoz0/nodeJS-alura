const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database')

class LivroController {

    list() {
        return function(req, resp) {
            console.log(`im here`)

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
        return function(req, resp) {
            resp.marko(require('../views/livros/form/form.marko'), { livro: {} });
        }
    }
}

module.exports = LivroController;