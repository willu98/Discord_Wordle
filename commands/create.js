const msg       = require('../model/game_message');
const Game      = require('../model/game');

module.exports = {
    name: 'play',
    description: `Start a Wordle game`,
    execute(message, inputs, games, dict) {        
        //if the user is attempting to start a game in the server and not DM
        
        let game;
        const word = dict.getRandomWord(dict.possibleWords);
        if(!games.find(e => e.player == message.author.id)){
            game = Game(message.author.id, word);
            games.push(game);
        }
        else{
            return message.reply('You are already in a game');
            //To start a game, you must do it in the server!');
        }
        console.log(word);

        message.reply('Your Wordle has been created');
        const res = msg(game);
        message.author.send({ embeds: [res] });
    },
};