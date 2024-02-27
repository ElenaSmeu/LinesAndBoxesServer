const express = require("express");
const app = express();
const port = 3000;
const gameboardsRouter = require('./routes/gameboard');
const resetRouter = require('./routes/resetGame');
const makeMoveRouter = require('./routes/makeMove');
const score = require("./routes/gameScore");
app.use(express.json());
app.use(express.urlencoded({
    extended:true,
}))

app.get("/", (req, res) => {
    res.json({message: "ok"});
})

app.use("/latestGameboard", gameboardsRouter);
app.use("/resetGame", resetRouter);
app.use("/makeMove", makeMoveRouter);
app.use("/score", score);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({message: err.message});
    return;
})


app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
})