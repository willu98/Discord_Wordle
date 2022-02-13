const dotenv    = require('dotenv');
const fs        = require('fs');
const words     = require('./util/words_util');
const { Intents, Client, Collection, Interaction } = require("discord.js");

dotenv.config();

const client = new Client({
    partials: ["CHANNEL"],
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES
    ]
});

client.commands = new Collection();

//mapping command files
const commands = fs.readdirSync('./commands/').filter((f) => f.endsWith('.js'));

for (const file of commands) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

const curr_games = [];

client.once("ready", () => {
    console.log("Bot Online");
    client.user.setActivity('Wordle');
});


client.on("messageCreate", message => {
    //expects first character to be ! for a command
    if (message.content.charAt(0) != '~' && message.content.charAt(0) != '!') return;

    const inputs = message.content.slice(1).split(' ');    
    const command = client.commands.get(inputs[0]);
    
    if(command) {
        //only letting user
        command.execute(message,inputs,curr_games, words);       
    }
    else{
        message.reply('Invalid command, type ~help for a list of commands!');
    }
});



client.login(process.env.DISCORD_TOKEN);