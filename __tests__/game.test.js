const game = require('../model/game');

describe('my game', () => {
    test('correct word maps3', () => {
        const testGame = game('TestID', 'exeem');
        expect(testGame.word).toBe('exeem');
    });
});


