const mysql = require('mysql2');

// Configuração do banco de dados
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

async function query(sql) {
    const connection = mysql.createConnection(config);

    const queryPromise = new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })

    const queryResults = await queryPromise;

    connection.end();
    return queryResults;
}

async function queryMultiple(sql, values) {
    const connection = mysql.createConnection(config);

    const queryPromise = new Promise((resolve, reject) => {
        connection.query(sql, [values], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })

    const queryResults = await queryPromise;

    connection.end();
    return queryResults;
}

const queryPromise = {
    query,
    queryMultiple
}

module.exports = { queryPromise };