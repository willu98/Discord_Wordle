module.exports = {
    name: 'help',
    description: `Responds with all commands and how to play`,
    execute(message, args, games) {
      message.reply(`
      COMMANDS:
      '!play' to start a private match
      '!play @user' to start a duel\n
      
      HOW TO PLAY:
      The goal is to guess the correct five letter english word.
      Correct characters will be diplayed as green if they are in the correct position and yellow otherwise.
      Incorrect characters as red.
      `);
    },
};