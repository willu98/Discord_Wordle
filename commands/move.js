const msg       = require('../model/game_message');

const chars_regular = 'ａ ｂ ｃ ｄ ｅ ｆ ｇ ｈ ｉ ｊ ｋ ｌ ｍ ｎ ｏ ｐ ｑ ｒ ｓ ｔ ｕ ｖ ｗ ｘ ｙ ｚ'.split(' ');
const chars_wrong = '【a】 【b】 【c】 【d】 【e】 【f】 【g】 【h】 【i】 【j】 【k】 【l】 【m】 【n】 【o】 【p】 【q】 【r】 【s】 【t】 【u】 【v】 【w】 【x】 【y】 【z】'.split(' ');
const chars_right = '『a』 『b』 『c』 『d』 『e』 『f』 『g』 『h』 『i』 『j』 『k』 『l』 『m』 『n』 『o』 『p』 『q』 『r』 『s』 『t』 『u』 『v』 『w』 『x』 『y』 『z』'.split(' ');

/**
 * 
 * @param {String, users guess} guess 
 * @param {The correct word} word 
 * @param {shallow copy of the word map} wordMap 
 * @param {array of the keys below the board to show users which characters they've used} characters 
 * @returns object holding the resulting string, and the amount of correct characters(in the correct position).
 */
const verification = (guess, word, wordMap, characters) => {
    const guessChars = [...guess];
    const wordChars = [...word];
    let result = Array(5).fill('');
    let counter = 0;

    //character comparison between word and guess
    //takes care of the situation where the user enters 
    for(let i = 0; i < guessChars.length; i++) {
        if(wordChars[i] === guessChars[i]){
            //accounting for character found
            wordMap.set(guessChars[i], wordMap.get(guessChars[i]) - 1);

            //
            result[i] = chars_right[guessChars[i].charCodeAt(0) - 97];

            counter++;
        }
    }

    for(let i = 0; i < guessChars.length; i++) {

        let char = (result[i] == '') ? chars_regular[guessChars[i].charCodeAt(0) - 97]:result[i];
        
        //setting all keys on keyboard to '' by default
        characters[guessChars[i].charCodeAt(0) - 97] = '';
        
        //If the word matches a character from the guess
        if(wordMap.has(guessChars[i]) && result[i] === ''){

            //accounting for character found
            wordMap.set(guessChars[i], wordMap.get(guessChars[i]) - 1);

            //ensures that character in guess exists in word
            //if the amount of a particular character is below that of the word
            //eg: if guessChars[i] === 'a' checks to see if the number of a's in the guess is less than in the word
            if(wordMap.get(guessChars[i]) >= 0){
                //if the character is in the correct position
                if(guessChars[i] === wordChars[i]){
                    char = chars_right[guessChars[i].charCodeAt(0) - 97];
                    characters[guessChars[i].charCodeAt(0) - 97] = char;
                    counter++;
                }
                else{
                    char = chars_wrong[guessChars[i].charCodeAt(0) - 97];
                    characters[guessChars[i].charCodeAt(0) - 97] = char;
                }
            }
        }
        result[i] = char;
    }
    const resultStr = result.join('');
    return {
        resultStr,
        counter
    };
}


module.exports = {
    name: 'w',
    description: `A wordle move`,
    execute(message, inputs, games, dict) {        

        //only let user play if they are in a private channel w the bot
        if(message.guild) return message.reply('You must be in the private chat to play');
        //getting the game of the user
        let game = games.findIndex(e => e.player == message.author.id);
        const guess = inputs[1];

        //cant make move if no game exists for user
        if(game == -1){
            return message.reply('Please start a game first!');
        }
        else{
            //checking if the users guess is valid
            if(dict.allowedWords.has(guess)) {
                games[game] = {...games[game], guessTry:games[game].guessTry + 1};

                //verifying guess
                const {resultStr:parsedGuess, counter} = verification(guess, games[game].word, new Map(games[game].wordMap), games[game].characters);
                games[game].guesses.push(parsedGuess);
                if(counter == 5) games[game].correct = true;

                //sending embed msg
                const res = msg(games[game]);
                message.author.send({ embeds: [res] });

                //ending game if conditions are fufilled
                if(games[game].correct || games[game].guessTry == 6){
                    games.splice(game, 1);
                }
            }
            else {
                message.reply('Not a valid 5 letter English word, please try again!');
            }
        }
    },
};