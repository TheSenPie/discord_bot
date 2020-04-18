'use strict';

require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

const commands = require('./services/commands');

client.on("ready", () => {
	console.log("Connected as " + client.user.tag);

	client.user.setActivity("a game");
})

client.on("message", (receivedMessage) => {
	commands.pass(receivedMessage);
});

client.login(process.env.DISCORD_ACCESS_TOKEN);