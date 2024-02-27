const db = require('./db');
const config = require('../config');

async function getLatestBoardState() {
    const latest = await db.query(`SELECT * FROM ${config.db.database}.boardgames ORDER BY createdBY DESC LIMIT 1;`)
    return latest;
}

module.exports = {
    getLatestBoardState
}