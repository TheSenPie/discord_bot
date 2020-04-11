'use strict';

/**
 * Send a message using a webhook
 */

// Import the discord.js module
const Discord = require('discord.js');
const client = new Discord.Client();

const _ = require("lodash");

const axios = require('axios');

const fs = require('fs');
let config_json = fs.readFileSync('./config.json');
let config = JSON.parse(config_json);
const {discord_access_token, happi_dev_api_key} = config;

let songs_json = fs.readFileSync('./songs.json');
let songs = JSON.parse(songs_json);

const command_regex = /^\$.*/;


client.on("ready", () => {
	console.log("Connected as " + client.user.tag);

	client.user.setActivity("a game");
})

client.on("message", (receivedMessage) => {
	if (receivedMessage.content.match(command_regex)) {
		let args = receivedMessage.content.slice(1, receivedMessage.content.length).split(/\W/);
		let command = args[0];
		let query = args.length > 1 ? _.drop(args, 1).join(" "): null;
		switch (command) {
			case "time":
				receivedMessage.reply(new Date().toString());
				break;
			case "poop":
				receivedMessage.channel.send(`\n░░░░░░░░░░░█▀▀░░█░░░░░░\n░░░░░░▄▀▀▀▀░░░░░█▄▄░░░░\n░░░░░░█░█░░░░░░░░░░▐░░░\n░░░░░░▐▐░░░░░░░░░▄░▐░░░\n░░░░░░█░░░░░░░░▄▀▀░▐░░░\n░░░░▄▀░░░░░░░░▐░▄▄▀░░░░\n░░▄▀░░░▐░░░░░█▄▀░▐░░░░░\n░░█░░░▐░░░░░░░░▄░█░░░░░\n░░░█▄░░▀▄░░░░▄▀▐░█░░░░░\n░░░█▐▀▀▀░▀▀▀▀░░▐░█░░░░░\n░░▐█▐▄░░▀░░░░░░▐░█▄▄░░\n░░░▀▀░▄TSM▄░░░▐▄▄▄▀░░░`);
				break;
			case "lyrics":
				if(query) {
					axios.get(`https://api.happi.dev/v1/music?q=${query}&limit=1&apikey=${happi_dev_api_key}&type=track`)
					.then(({data})=> {
						let response = data.result[0];
						receivedMessage.reply(
							`track: ${response.track}\nartsit: ${response.artist}\nalbum: ${response.album}`
						);
						if(response.haslyrics) {
							return axios.get(`https://api.happi.dev/v1/music/artists/${response.id_artist}/albums/${response.id_album}/tracks/${response.id_track}/lyrics?apikey=${happi_dev_api_key}`);
						}
						receivedMessage.channel.send("Lyrics not found!");	
					})
					.then(({data}) => {
						let response = data.result.lyrics.match(/.{1,1999}/g);
						receivedMessage.channel.send(`Lyrcs:\n`)
						response.forEach(element => {
								receivedMessage.channel.send(`${element}`)
							}
						);
					})
					.catch((err) => {
						console.log(err);
					})
				}
				break;
			case "help":
				receivedMessage.reply('Fuck you');
				break;
			default:
				receivedMessage.channel.send('Seems you wrote a wrong command. Type $help to see commands');
		}
	}
});

client.login(discord_access_token);