const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'appdb'

});

function executeQuery(query) {
    return new Promise((res, rej) => {
        pool.query(query, (error, results, fields) => {
            if (error) rej(error);

            console.log({ error, results });
           
                res(results);
            
          
            
        })
    });
}

// var getConnection = function (callback) {
//     pool.getConnection(function (err, connection) {
//         callback(err, connection);
//     });
// };

module.exports = {
    executeQuery
}

//module.exports = { getConnection }