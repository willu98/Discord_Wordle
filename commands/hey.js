module.exports = {
    name: 'hey',
    description: `Responds with hey`,
    execute(message, args, games) {
      message.reply('Hey!');
    },
};