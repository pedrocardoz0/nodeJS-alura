const livroRotas = require('../rotas/livros-rotas');
const baseRotas = require('../rotas/base-rotas');

module.exports = (app) => {
    baseRotas(app);
    livroRotas(app);
};