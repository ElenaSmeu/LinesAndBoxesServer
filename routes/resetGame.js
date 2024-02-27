const express = require('express');
const router = express.Router();
const gameboards = require('../services/gameboards');
const gameplay = require('../services/gameplay');

router.get('/', async function(req, res, next) {
    try {
        coordinates = gameplay.defaultState()
        player1Score = 0
        player2Score = 0
        coordinates["21"] = 1
        coordinates["11"] = 1
        coordinates["22"] = 1
        coordinates["31"] = 1
        coordinates["12"] = 1
        coordinates["23"] = 1
        coordinates["32"] = 1
        coordinates["41"] = 1
        coordinates["42"] = 1
        coordinates["43"] = 1
        coordinates["51"] = 1
        coordinates["52"] = 1
        theDefault = {player1: player1Score, player2: player2Score, createdBy: null, gameboard : coordinates}
        res.json(await gameboards.insertEntry(theDefault));
    } catch (err) {
        console.error('Errow while inserting the entity', err.message);
        next(err);
    }
})

module.exports = router;