const express = require('express');
const router = express.Router();
const gameboards = require('../services/gameboards');
const gameplay = require('../services/gameplay');

router.get('/', async function(req, res, next) {
    try {
        const player = req.query.player;
        const testMoveRow = req.query.row;
        const testMoveCol = req.query.col;
        console.log(player, testMoveCol, testMoveRow);
        const latestboard = await gameboards.getLatestBoardState();
        const currentPlayerScore = (player == 1 ? latestboard.player1 : latestboard.player2)
        let currentBoard = latestboard;
        const decodedGameboard = JSON.parse(currentBoard.gameboard)
        const newStuff = gameplay.movePlayer(testMoveRow, testMoveCol, decodedGameboard, currentPlayerScore);
        currentBoard.gameboard = newStuff.newBoard;
        if (player == 1) {
            currentBoard.player1 = newStuff.newPlayerScore;
            currentBoard.createdBy = 1;
        } else if (player == 2) {
            currentBoard.player2 = newStuff.newPlayerScore;
            currentBoard.createdBy = 2;
        }
        res.json(await gameboards.insertEntry(currentBoard));
       
    } catch (err) {
        console.error('Errow while inserting the entity', err.message);
        next(err);
    }
})

module.exports = router;