const msg       = require('../model/game_message');
const verify    = require('../util/verify');


module.exports = {
    name: 'w',
    description: `A wordle move`,
    execute(message, inputs, games, dict) {        

        //only let user play if they are in a private channel w the bot
        if(message.guild) return message.reply('You must be in the private chat to play');
        //getting the game of the user
        let game = games.findIndex(e => e.player == message.author.id);
        const guess = inputs[1].toLowerCase();

        //cant make move if no game exists for user
        if(game == -1){
            return message.reply('Please start a game first!');
        }
        else{
            //checking if the users guess is valid
            if(dict.allowedWords.has(guess)) {
                games[game] = {...games[game], guessTry:games[game].guessTry + 1};

                //verifying guess
                const {resultStr:parsedGuess, counter} = verify(guess, games[game].word, new Map(games[game].wordMap), games[game].characters);
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