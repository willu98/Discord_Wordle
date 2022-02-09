const msg       = require('../model/game_message');

const chars_regular = 'ａ ｂ ｃ ｄ ｅ ｆ ｇ ｈ ｉ ｊ ｋ ｌ ｍ ｎ ｏ ｐ ｑ ｒ ｓ ｔ ｕ ｖ ｗ ｘ ｙ ｚ'.split(' ');
const chars_wrong = '【a】 【b】 【c】 【d】 【e】 【f】 【g】 【h】 【i】 【j】 【k】 【l】 【m】 【n】 【o】 【p】 【q】 【r】 【s】 【t】 【u】 【v】 【w】 【x】 【y】 【z】'.split(' ');
const chars_right = '『a』 『b』 『c』 『d』 『e』 『f』 『g』 『h』 『i』 『j』 『k』 『l』 『m』 『n』 『o』 『p』 『q』 『r』 『s』 『t』 『u』 『v』 『w』 『x』 『y』 『z』'.split(' ');

const verification = (guess, word, wordMap, characters) => {
    const guessChars = [...guess];
    const wordChars = [...word];
    let result = '';

    for(let i = 0; i < guessChars.length; i++) {
        let char = chars_regular[guessChars[i].charCodeAt(0) - 97];

        //If the word matches a character from the guess
        if(wordMap.has(guessChars[i])){
            console.log(guessChars[i]);
            //accounting for character found
            wordMap.set(guessChars[i], wordMap.get(guessChars[i]) - 1);

            //if the amount of a particular character is below that of the word
            //eg: if guessChars[i] === 'a' checks to see if the number of a's in the guess is less than in the word
            if(wordMap.get(guessChars[i]) >= 0){

                if(guessChars[i] === wordChars[i]){
                    char = chars_right[guessChars[i].charCodeAt(0) - 97];
                    characters[guessChars[i].charCodeAt(0) - 97] = char;
                }
                else{
                    char = chars_wrong[guessChars[i].charCodeAt(0) - 97];
                    characters[guessChars[i].charCodeAt(0) - 97] = char;
                }
            }
        }
        

        result += char;
        console.log(wordMap);
    }
    
    return result;
}


module.exports = {
    name: 'w',
    description: `A wordle move`,
    execute(message, inputs, games, dict) {        

        //getting the game of the user
        let game = games.findIndex(e => e.player == message.author.id);
        const guess = inputs[1];
        const word = game.word;            

        //cant make move if no game exists for user
        if(game == -1){
            return message.reply('Please start a game first!');
        }
        else{
            //checking if the users guess is valid
            if(dict.allowedWords.has(guess)) {
                games[game] = {...games[game], guessTry:games[game].guessTry + 1};

                const parsedGuess = verification(guess, games[game].word, new Map(games[game].wordMap), games[game].characters);

                games[game].guesses.push(parsedGuess);
                console.log( games[game]);
                const res = msg(games[game]);
                message.author.send({ embeds: [res] });
            }
            else {
                message.reply('Not a valid 5 letter English word, please try again!');
            }
        }
    },
};