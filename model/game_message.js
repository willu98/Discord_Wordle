const { MessageEmbed } = require('discord.js');
const chars_regular = 'ａ ｂ ｃ ｄ ｅ ｆ ｇ ｈ ｉ ｊ ｋ ｌ ｍ ｎ ｏ ｐ ｑ ｒ ｓ ｔ ｕ ｖ ｗ ｘ ｚ'.split(' ');
const chars_wrong = '【a】 【b】 【c】 【d】 【e】 【f】 【g】 【h】 【i】 【j】 【k】 【l】 【m】 【n】 【o】 【p】 【q】 【r】 【s】 【t】 【u】 【v】 【w】 【x】 【z】'.split(' ');
const chars_right = '『a』 『b』 『c』 『d』 『e』 『f』 『g』 『h』 『i』 『j』 『k』 『l』 『m』 『n』 『o』 『p』 『q』 『r』 『s』 『t』 『u』 『v』 『w』 『x』 『z』'.split(' ');
const blank = `${':blue_square:'.repeat(6)}\n`;

module.exports = (game) => {
    //const board;
    let board = `${blank}`.repeat(6); 
    if(game.words.length > 0){
        board = '';
    }
    /*const mapping = words.forEach(e => {
        if(e.length == 0) board +=        
    });*/
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
            value: 'as'
        },
        { name: '\u200B', value: '\u200B' },
        { name: 'Inline field title', value: 'Some value here', inline: true },
        { name: 'Inline field title', value: 'Some value here', inline: true },
    )
    .setTimestamp()
    .setFooter({ text: 'Made by Willu', iconURL: 'https://i.imgur.com/gdS7n8M.png' });        
    return message;
};