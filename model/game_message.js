const { MessageEmbed } = require('discord.js');

const blank = `${':blue_square:'.repeat(6)}\n`;



module.exports = (game) => {

    
    let entries = '';
    game.guesses.forEach(e => {
        entries += `${e}\n`;
    });

    const message = new MessageEmbed()
    .setColor('#c0fe8b')
    .setTitle('Wordle: Single-Player')        
    .setAuthor({ name: 'Wordle', iconURL: 'https://i.imgur.com/gdS7n8M.png'})
    .setDescription(`How to play:
    To guess a word: !w 'your word'
    To end the game: !w end\n
    These Characters(ａ) represent incorrect characters
    These Characters(【a】) represent correct characters in the incorrect position
    These Characters(『a』) represent correct characters in the correct position`)
    .addFields(
        { 
            name: `Your Wordle: (${game.guessTry}/6)`, 
            value: entries?`${entries}`:'Please make your first move!'
        },
        { name: '\u200B', value: '\u200B' },
        { name: 'Inline field title', value: 'Some value here', inline: true },
        { name: 'Inline field title', value: 'Some value here', inline: true },
    )
    .setTimestamp()
    .setFooter({ text: 'Made by Willu', iconURL: 'https://avatars.githubusercontent.com/u/39043113?s=96&v=4' });        
    return message;
};