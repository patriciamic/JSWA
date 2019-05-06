const Pool = require('pg').Pool;
const db = require('./database.config');
const pool = new Pool(db.db);

module.exports = {
    executeQuery: function executeQuery(query) {
        return new Promise((res, rej) => {
            pool.connect((err, client, release) => {
                if (err) {
                    rej(err.stack);
                }
                client.query(query.text, query.values, (err, result) => {
                    release();
                    if (err) {
                        rej(err['hint']);
                    }
                    if (result && result.rows) {
                        res(result.rows);
                    } else {
                        res([]);
                    }
                });
            });
        });
    }
}