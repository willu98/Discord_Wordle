const getMap = require('../util/wordMap');

module.exports = (player, word) => {
    return {
        player,
        word,
        wordMap:getMap(word),
        words:[],
        guessTry:0,
        guesses:[],
        characters:'ａ ｂ ｃ ｄ ｅ ｆ ｇ ｈ ｉ ｊ ｋ ｌ ｍ ｎ ｏ ｐ ｑ ｒ ｓ ｔ ｕ ｖ ｗ ｘ ｙ ｚ'.split(' '),
        correct:false
    };
};