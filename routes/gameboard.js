const express = require('express');
const router = express.Router();
const gameboards = require('../services/gameboards');

router.get('/', async function(req, res, next) {
    try {
        const boardState = await gameboards.getLatestBoardState();
        decodedBoardState = JSON.parse(boardState.gameboard);
        res.json(decodedBoardState);
    } catch (err) {
        console.error('Error was', err.message);
        next(err);
    }
});


module.exports = router;