const express = require('express');
const router = express.Router();
const gameboards = require('../services/gameboards');
const gameplay = require('../services/gameplay');

router.get('/', async function(req, res, next) {
    try {
        theDefault = {player1: 0, player2: 0, createdBy: null, gameboard : gameplay.defaultState()}
        res.json(await gameboards.insertEntry(theDefault));
    } catch (err) {
        console.error('Errow while inserting the entity', err.message);
        next(err);
    }
})

module.exports = router;