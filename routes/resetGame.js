const express = require('express');
const router = express.Router();
const gameboards = require('../services/gameboards');
const gameplay = require('../services/gameplay');

router.get('/', async function(req, res, next) {
    try {
        coordinates = gameplay.defaultState()
        player1Score = 0
        player2Score = 0
        coordinates["21"] = 0
        coordinates["11"] = 0
        coordinates["22"] = 0
        coordinates["31"] = 0
        coordinates["12"] = 0
        coordinates["23"] = 0
        coordinates["32"] = 0
        coordinates["41"] = 0
        coordinates["42"] = 0
        coordinates["43"] = 0
        coordinates["51"] = 0
        coordinates["52"] = 0
        theDefault = {player1: player1Score, player2: player2Score, createdBy: null, gameboard : coordinates}
        res.json(await gameboards.insertEntry(theDefault));
    } catch (err) {
        console.error('Errow while inserting the entity', err.message);
        next(err);
    }
})

module.exports = router;