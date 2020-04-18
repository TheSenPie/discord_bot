require('dotenv').config();

const axios = require('axios');
const _ = require("lodash");

module.exports = {
	get: async (query, receivedMessage) => {
		if (!_.trim(query))
			return;
		let {data: {result: [response]}} = await axios.get(`https://api.happi.dev/v1/music?q=${query}&limit=1&apikey=${process.env.HAPPI_DEV_API_KEY}&type=track`);
		
		if(response) {
			receivedMessage.reply("```" + `\ntrack: ${response.track}\nartsit: ${response.artist}\nalbum: ${response.album}\n` + "```");			
		} else {
			return receivedMessage.channel.send("Track not found! Maybe it's shitty song...");
		}
		
		if(response && response.haslyrics) {
			let {data: {result: {lyrics}}} = await axios.get(`https://api.happi.dev/v1/music/artists/${response.id_artist}/albums/${response.id_album}/tracks/${response.id_track}/lyrics?apikey=${process.env.HAPPI_DEV_API_KEY}`);
			let chunks = lyrics.match(/(.|[\r\n]){1,1500}/g);
			receivedMessage.channel.send(`Lyrcs:\n`);
			chunks.forEach(element => {
				receivedMessage.channel.send("```"+`${element}`+"```");
			});
		} else {
			return receivedMessage.channel.send("Lyrics not found!");
		}
	}
}