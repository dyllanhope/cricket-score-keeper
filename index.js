'use strict';
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const CricketScoreKeeper = require('./cricket-score-keeper');

const app = express();

const handlebarSetup = exphbs({
    partialsDir: './views',
    viewPath: './views',
    layoutsDir: './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cricketInstanceOne = CricketScoreKeeper();
const cricketInstanceTwo = CricketScoreKeeper();

let gameOver = false;
let draw = false;
let winner = '';

app.get('/', (req, res) => {
    res.render('index', {
        overStringOne: cricketInstanceOne.currentOverString(),
        totalOne: cricketInstanceOne.totalScore(),
        wicketsOne: cricketInstanceOne.wicketCount(),
        oversPlayedOne: cricketInstanceOne.overCount(),
        gameDoneOne: cricketInstanceOne.gameStatus(),
        overStringTwo: cricketInstanceTwo.currentOverString(),
        totalTwo: cricketInstanceTwo.totalScore(),
        wicketsTwo: cricketInstanceTwo.wicketCount(),
        oversPlayedTwo: cricketInstanceTwo.overCount(),
        gameDoneTwo: cricketInstanceTwo.gameStatus(),
        oversSet: cricketInstanceOne.oversSet(),
        overAmount: cricketInstanceOne.overAmount(),
        gameOver,
        winner,
        draw
    });
});

app.post('/add/play', (req, res) => {
    let play = req.body;
    play = Object.keys(play);
    if (play[0] === 'choiceOne') {
        cricketInstanceOne.addToCurrentOver(req.body.choiceOne);
    } else if (play[0] === 'choiceTwo') {
        cricketInstanceTwo.addToCurrentOver(req.body.choiceTwo);
    };
    res.redirect('/');
});

app.post('/set/over/count', (req, res) => {
    cricketInstanceOne.setOvers(req.body.overCount);
    cricketInstanceTwo.setOvers(req.body.overCount);
    res.redirect('/');
});

app.post('/submit/over', (req, res) => {
    const team = req.body.team;
    if (team === '1') {
        const over = cricketInstanceOne.currentOverString();
        if (over.length === 6) {
            cricketInstanceOne.addOverScore(over);
            cricketInstanceOne.resetCurrentOver();
        }
    } else if (team === '2') {
        const over = cricketInstanceTwo.currentOverString();
        if (over.length === 6) {
            cricketInstanceTwo.addOverScore(over);
            cricketInstanceTwo.resetCurrentOver();
        }
    }
    if (cricketInstanceOne.gameStatus() && cricketInstanceTwo.gameStatus()) {
        gameOver = true;
        if (cricketInstanceTwo.totalScore() > cricketInstanceOne.totalScore()) {
            winner = 'Team 2';
        } else if (cricketInstanceOne.totalScore() > cricketInstanceTwo.totalScore()) {
            winner = 'Team 1';
        } else if (cricketInstanceOne.totalScore() === cricketInstanceTwo.totalScore()) {
            draw = true;
        };
    };
    res.redirect('/');
});

app.post('/new/game', (req, res) => {
    gameOver = false;
    draw = false;
    winner = '';

    cricketInstanceOne.resetGame();
    cricketInstanceTwo.resetGame();
    res.redirect('/');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('App started on port: ' + PORT);
});
