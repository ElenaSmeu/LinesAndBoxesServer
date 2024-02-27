const express = require('express');
const router = express.Router();
const gameboards = require('../services/gameboards');

router.get('/', async function(req, res, next) {
    try {
        res.json(await gameboards.getLatestBoardState());
    } catch (err) {
        console.error('Error was', err.message);
        next(err);
    }
});


module.exports = router;