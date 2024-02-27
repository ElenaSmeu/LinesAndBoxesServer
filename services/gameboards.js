const db = require('./db');
const config = require('../config');

async function getLatestBoardState() {
    const latest = await db.query(`SELECT * FROM ${config.db.database}.boardgames ORDER BY createdAt DESC LIMIT 1;`)
    return latest.pop();
}

async function insertEntry(gameboardState) {
    createdAt = new Date();
    createdAtString = createdAt.toString()
    gameState = JSON.stringify(gameboardState.gameboard)
    const result = await db.query(
        `INSERT INTO boardgames (gameboard, createdAt, player1, player2, createdBy) VALUES ('${gameState}', '${createdAtString}', ${gameboardState.player1}, ${gameboardState.player2}, ${gameboardState.createdBy})`
    );
    let message = ('Error in creating entity', gameboardState);
    if (result.affectedRows) {
        message = 'All good';
    }
    return {message};
}

module.exports = {
    getLatestBoardState
    , insertEntry
}