const { MessageEmbed } = require('discord.js');


module.exports = (game) => {

    let entries = '';
    game.guesses.forEach(e => {
        entries += `${e}\n`;
    });

    let characters = '';
    game.characters.forEach(e => {
        characters += `${e} `;
    });
    
    let afterGame = '';
    if(game.correct){
        afterGame = `\nYou found the word in ${game.guessTry}/6 tries`;
    }
    else if(game.guessTry === 6){
        afterGame = `\nYou failed to find the word, the word was ${game.word}`;
    }

    console.log(afterGame);

    const message = new MessageEmbed()
    .setColor('#c0fe8b')
    .setTitle('Wordle: Single-Player')        
    .setAuthor({ name: 'Wordle', iconURL: 'https://i.imgur.com/gdS7n8M.png'})
    .setDescription(`How to play:
    To guess a word: ~w 'your word'
    To end the game: ~w end\n
    These Characters(ａ) represent incorrect characters
    These Characters(【a】) represent correct characters in the incorrect position
    These Characters(『a』) represent correct characters in the correct position`)
    .addFields(
        { 
            name: `Your Wordle: (${game.guessTry}/6)`, 
            value: `${entries?entries:'Please make your first move!'} ${afterGame}` 
        },
        { 
            name: `Characters`, 
            value: `${characters}`
        },
        { name: 'Inline field title', value: 'Some value here', inline: true },
        { name: 'Inline field title', value: 'Some value here', inline: true },
    )
    .setTimestamp()
    .setFooter({ text: 'Made by Willu', iconURL: 'https://avatars.githubusercontent.com/u/39043113?s=96&v=4' });        
    return message;
};