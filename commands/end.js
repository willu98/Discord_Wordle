
module.exports = {
    name: 'end',
    description: `allows user to end the wordle game`,
    execute(message, inputs, games) {        

        //getting the game of the user
        let game = games.findIndex(e => e.player == message.author.id);

        //cant end game if no game exists
        if(game == -1){
            return message.reply('No game to end!');
        }
        else{
            games.splice(game, 1);
            return message.reply('Game ended!');
        }
    },
};