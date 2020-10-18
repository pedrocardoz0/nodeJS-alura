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
}

module.exports = LivroDao;