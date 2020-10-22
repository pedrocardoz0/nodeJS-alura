const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');
const { check, validationResult } = require('express-validator/check')

const LivroController = require('../controllers/livro-controller');
const livroController = new LivroController()

module.exports = (app) => {
    const rotasBase = Base

    app.get('/', livroController.home());

    app.get('/livros', livroController.list());

    app.get('/livros/form', livroController.showForm());

    app.get('/livros/form/:id', livroController.showFormById());

    app.post('/livros', [
        check('titulo').isLength({ min: 5 }).withMessage('O título precisa ter no mínimo 5 caracteres !'),
        check('preco').isCurrency().withMessage('O preço precisa ter um valor monetário !')
    ], livroController.insert());

    app.put('/livros', livroController.update());

    app.delete('/livros/:id', livroController.delete());
};