const game = require('../game');

describe('my game', () => {
    test('correct word map', () => {
        const testGame = game('TestID', 'exeem');
        expect(testGame.word).toBe('exeem');
    });
});


