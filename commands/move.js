const msg       = require('../model/game_message');

module.exports = {
    name: 'w',
    description: `A wordle move`,
    execute(message, inputs, games, dict) {        

        //getting the game of the user
        const game = !games.find(e => e.player == message.author.id);
        const guess = inputs[1];
        const word = game.word;            

        //cant make move if no game exists for user
        if(game){
            return message.reply('Please start a game first!');
        }
        else{
            //checking if the users guess is valid
            if(dict.allowedWords.has(guess)) {
                
            }
            else {
                message.reply('Not a valid 5 letter English word, please try again!');
            }
        }
        

        //if the me
        
        //const res = msg(word, game.words);
        //message.author.send({ embeds: [res] });
    },
};