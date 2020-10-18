const { response } = require("express");

class LivroDao {
    constructor(db) {
        this._db = db;
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                `SELECT * FROM livros`,
                (error, response) => {
                    if (error) return reject('erásdror');
                    
                    return resolve(response);
                }
            )
        });   
    }

    insert(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `INSERT INTO livros (
                    titulo,
                    preco,
                    descricao   
                ) VALUES (?, ?, ?)`,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ],
                (erro) => {
                    if(erro) return reject(erro)
                    return resolve()
                }
            )
        })
    }

    searchById(id) {
        return new Promise((resolve, reject) => {
            this._db.all(
                `SELECT * FROM livros WHERE id = ${id}`,
                (error, response) => {
                    if (error) return reject(error);

                    return resolve(response);
                }
            )
        });
    }

    updateById(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `UPDATE livros SET titulo=?, preco=?, descricao=? WHERE id=?;`,
                [livro.titulo, livro.preco, livro.descricao, livro.id],
                (error, response) => {
                    if (error) return reject(error);

                    return resolve(response);
                }
            )
        })
    }

    removeById(id) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `DELETE FROM livros WHERE id = ?`,
                [ id ],
                (erro, response) => {
                    if(erro) return reject(erro);

                    return resolve(response);
                }    
            );
        });
    }
}

module.exports = LivroDao;