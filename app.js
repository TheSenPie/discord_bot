'use strict';

/**
 * Send a message using a webhook
 */

// Import the discord.js module
const Discord = require('discord.js');
const client = new Discord.Client();
const command_regex = /^\$.*/;

client.on("ready", () => {
	console.log("Connected as " + client.user.tag);

	client.user.setActivity("with my pussy");
})

client.on("message", (receivedMessage) => {
	if (receivedMessage.content.match(command_regex)) {
		let command = receivedMessage.content.slice(1, receivedMessage.content.length);
		switch (command) {
			case "time":
				receivedMessage.reply(new Date().toString());
			case "poop":
				receivedMessage.channel.send(`\n░░░░░░░░░░░█▀▀░░█░░░░░░\n░░░░░░▄▀▀▀▀░░░░░█▄▄░░░░\n░░░░░░█░█░░░░░░░░░░▐░░░\n░░░░░░▐▐░░░░░░░░░▄░▐░░░\n░░░░░░█░░░░░░░░▄▀▀░▐░░░\n░░░░▄▀░░░░░░░░▐░▄▄▀░░░░\n░░▄▀░░░▐░░░░░█▄▀░▐░░░░░\n░░█░░░▐░░░░░░░░▄░█░░░░░\n░░░█▄░░▀▄░░░░▄▀▐░█░░░░░\n░░░█▐▀▀▀░▀▀▀▀░░▐░█░░░░░\n░░▐█▐▄░░▀░░░░░░▐░█▄▄░░\n░░░▀▀░▄TSM▄░░░▐▄▄▄▀░░░`);
		}
	}
});

client.login("Njk4MTYwNjc0MTkwMTMxMjky.XpBzcg.VwgGLq0zlR-J3DTX4XNPuRoGigo");