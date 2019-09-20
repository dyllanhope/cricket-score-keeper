'use strict';
module.exports = () => {
    let currentTotal = 0;
    let wickets = 0;
    let overs = 0;
    let oversPlayed = 0;
    let overSet = false;
    let currentOver = '';
    let gameDone = false;

    const addOverScore = (overString) => {
        if (oversPlayed < overs && !gameDone) {
            const over = overString || '';
            let score = 0;
            for (let i = 0; i < over.length; i++) {
                if (wickets !== 10) {
                    switch (over[i]) {
                    case '1':
                        score += 1;
                        break;
                    case '2':
                        score += 2;
                        break;
                    case '3':
                        score += 3;
                        break;
                    case '4':
                        score += 4;
                        break;
                    case '6':
                        score += 6;
                        break;
                    case 'w':
                        wickets++;
                        if (wickets === 10) {
                            gameDone = true;
                        }
                        break;
                    default:
                        score += 0;
                    };
                };
            };
            currentTotal += score;
            oversPlayed++;
            if (oversPlayed === overs) {
                gameDone = true;
            };
        }
    };

    const totalScore = () => { return currentTotal; };

    const wicketCount = () => { return wickets; };

    const setOvers = (num) => {
        if (num > 0) {
            overSet = true;
            overs = Number(num);
        }
    };

    const overCount = () => {
        return oversPlayed;
    };

    const addToCurrentOver = (val) => {
        if (currentOver.length !== 6) {
            currentOver += val;
        };
    };

    const currentOverString = () => { return currentOver; };

    const resetCurrentOver = () => { currentOver = ''; };

    const gameStatus = () => { return gameDone; };

    const resetGame = () => {
        overSet = false;
        currentTotal = 0;
        wickets = 0;
        overs = 0;
        oversPlayed = 0;
        currentOver = '';
        gameDone = false;
    };

    const oversSet = () => { return overSet; };

    const overAmount = () => { return overs; };

    const generateRandomOver = () => {
        currentOver = '';
        for (let i = 0; i < 6; i++) {
            const randomNum = Math.floor(Math.random() * 7) + 1;
            switch (randomNum) {
            case 1:
                currentOver += '1';
                break;
            case 2:
                currentOver += '2';
                break;
            case 3:
                currentOver += '3';
                break;
            case 4:
                currentOver += '4';
                break;
            case 5:
                currentOver += '6';
                break;
            case 6:
                currentOver += 'w';
                break;
            case 7:
                currentOver += '-';
                break;
            }
        }
    };

    return {
        addOverScore,
        totalScore,
        wicketCount,
        setOvers,
        overCount,
        addToCurrentOver,
        currentOverString,
        resetCurrentOver,
        gameStatus,
        resetGame,
        oversSet,
        overAmount,
        generateRandomOver
    };
};
