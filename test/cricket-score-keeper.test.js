'use strict';
const assert = require('assert');
const cricketScoreKeeper = require('../cricket-score-keeper');

describe('Cricket score keeper tests', () => {
    describe('Testing over string scoring system', () => {
        it('Should return the correct score of 6 runs after 1 over string is entered', () => {
            const cricketInstance = cricketScoreKeeper();
            cricketInstance.setOvers(5);

            cricketInstance.addOverScore('-13-2-');
            assert.strict.equal(cricketInstance.totalScore(), 6);
        });
        it('Should return the total of 0 runs with an empty string input', () => {
            const cricketInstance = cricketScoreKeeper();
            cricketInstance.setOvers(5);

            cricketInstance.addOverScore('');
            assert.strict.equal(cricketInstance.totalScore(), 0);
        });
        it('Should return the total of 13 runs after 3 overs were entered, totals of 6, 7 and 0', () => {
            const cricketInstance = cricketScoreKeeper();
            cricketInstance.setOvers(5);

            cricketInstance.addOverScore('-13-2-');
            cricketInstance.addOverScore('-6-1-');
            cricketInstance.addOverScore('-----');
            assert.strict.equal(cricketInstance.totalScore(), 13);
        });
        it('Should return the total of 13 runs with 2 wickets', () => {
            const cricketInstance = cricketScoreKeeper();
            cricketInstance.setOvers(5);

            cricketInstance.addOverScore('w13-2-');
            cricketInstance.addOverScore('-6-1-');
            cricketInstance.addOverScore('--w--');
            assert.strict.equal(cricketInstance.totalScore(), 13);
            assert.strict.equal(cricketInstance.wicketCount(), 2);
        });
        it('Should return the total of 19 runs with 10 wickets, points should not increase after 10 wickets has been reached', () => {
            const cricketInstance = cricketScoreKeeper();
            cricketInstance.setOvers(5);

            cricketInstance.addOverScore('w1w-2-');
            cricketInstance.addOverScore('w6-w-');
            cricketInstance.addOverScore('4-www');
            cricketInstance.addOverScore('w6-ww1');
            assert.strict.equal(cricketInstance.totalScore(), 19);
            assert.strict.equal(cricketInstance.wicketCount(), 10);
        });
    });
    describe('Testing the over system', () => {
        it('Should return 37 runs after 5 overs have been played', () => {
            const cricketInstance = cricketScoreKeeper();
            cricketInstance.setOvers(5);
            cricketInstance.addOverScore('w1w-2-');
            cricketInstance.addOverScore('w6-w-');
            cricketInstance.addOverScore('4-w2w');
            cricketInstance.addOverScore('w6--w1');
            cricketInstance.addOverScore('16-341');
            cricketInstance.addOverScore('---2-1');

            assert.strict.equal(cricketInstance.overCount(), 5);
            assert.strict.equal(cricketInstance.totalScore(), 37);
        });
        it('Should return 15 runs after 3 overs have been played', () => {
            const cricketInstance = cricketScoreKeeper();
            cricketInstance.setOvers(5);
            cricketInstance.addOverScore('w1w-2-');
            cricketInstance.addOverScore('w6-w-');
            cricketInstance.addOverScore('4-w2w');

            assert.strict.equal(cricketInstance.overCount(), 3);
            assert.strict.equal(cricketInstance.totalScore(), 15);
        });
    });
});
