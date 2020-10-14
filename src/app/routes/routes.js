module.exports = (app) => {

    app.get('/home', (req, resp) => {
        resp.marko(
            require('../views/livros/lista/home.marko')
        );
    });
    
    app.get('/livros', (req, resp) => {
        resp.marko(
            require('../views/livros/lista/lista.marko'),
            {
                livros: [
                    {
                        id: 1,
                        titulo: 'Fundamentos Node'
                    },
                    {
                        id: 2,
                        titulo: 'Node avancado'
                    }
                ]
            }
        );
    });
}

