const LivroController = require('../controllers/livro-controller');
const livroController = new LivroController()

const Livro = require('../model/livro');

module.exports = (app) => {

    const rotasLivro = LivroController.rotas();

    app.get('/livros/:id', livroController.showFormById())

    app.get(rotasLivro.lista, livroController.list());

    /**
     * Para um unico route é possível agregar vários métodos HTTP
     */
    app.route(rotasLivro.cadastro)
        .get(livroController.showForm())
        .post(Livro.validacoes(),livroController.insert())
        .put(livroController.update());

    app.get(rotasLivro.edicao, livroController.showFormById());

    app.delete(rotasLivro.delecao, livroController.delete());
};