'use strict';
module.exports = () => {
    let currentTotal = 0;
    let wickets = 0;
    let overs = 0;
    let oversPlayed = 0;

    const addOverScore = (overString) => {
        if (overs !== oversPlayed) {
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
                        break;
                    default:
                        score += 0;
                    };
                };
            };
            currentTotal += score;
            oversPlayed++;
        }
    };

    const totalScore = () => { return currentTotal; };

    const wicketCount = () => { return wickets; };

    const setOvers = (num) => { overs = num; };

    const overCount = () => {
        return oversPlayed;
    };

    return {
        addOverScore,
        totalScore,
        wicketCount,
        setOvers,
        overCount
    };
};
