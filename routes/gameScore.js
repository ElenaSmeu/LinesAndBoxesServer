const express = require('express');
const router = express.Router();
const gameboards = require('../services/gameboards');
const gameplay = require('../services/gameplay');

router.get('/', async function(req, res, next) {
    try {
        const latestboard = await gameboards.getLatestBoardState();
        
        res.json(`Player1: ${latestboard.player1} VS Player2: ${latestboard.player2}`);
       
    } catch (err) {
        console.error('Errow while inserting the entity', err.message);
        next(err);
    }
})

module.exports = router;