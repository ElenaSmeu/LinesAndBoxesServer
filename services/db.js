const mysql = require('mysql2/promise');
const config = require('../config');
const poolManager = require('mysql-connection-pool-manager');


let connection;


async function query(sql, params) {
    if (!connection) {
        connection = await mysql.createConnection(config.db);
    }
    const [results, ] = await connection.execute(sql, params);
    connection.end();
    connection = null;
    return results;
}

module.exports = {
    query
}