const game = require('../game');

describe('my game', () => {
    test('correct word map', () => {
        const testGame = game('TestID', 'words');
        expect(testGame.word).toBe('words');
    });
});


