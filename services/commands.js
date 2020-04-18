require('dotenv').config();

const _ = require("lodash");
const stickers = require("./stickers");
const lyrics = require("./lyrics");

module.exports = {
    pass: function (receivedMessage) {
        if (!_.startsWith(receivedMessage.content, '$'))
            return;
        let message = receivedMessage.content.slice(0);
        let commands = _.words(message);
        if (commands[0])
            this.call(commands, receivedMessage);
    },
    call: function (commands, receivedMessage) {
        let command = commands[0];
        switch (command) {
            case "time":
                receivedMessage.reply(new Date().toString());
                break;
            case "poop":
                let poop = "```" + `
				░░░░░░░░░░░█▀▀░░█░░░░░░
				░░░░░░▄▀▀▀▀░░░░░█▄▄░░░░
				░░░░░░█░█░░░░░░░░░░▐░░░
				░░░░░░▐▐░░░░░░░░░▄░▐░░░
				░░░░░░█░░░░░░░░▄▀▀░▐░░░
				░░░░▄▀░░░░░░░░▐░▄▄▀░░░░
				░░▄▀░░░▐░░░░░█▄▀░▐░░░░░
				░░█░░░▐░░░░░░░░▄░█░░░░░
				░░░█▄░░▀▄░░░░▄▀▐░█░░░░░
				░░░█▐▀▀▀░▀▀▀▀░░▐░█░░░░░
				░░▐█▐▄░░▀░░░░░░▐░█▄▄░░░
				░░░▀▀░▄ ██▄░░░▐▄▄▄▀░░░░
            `+"```";
                receivedMessage.channel.send(_.replace(poop, /\t/g, ""));
                break;
            case "lyrics":
                let query = _.join(commands.slice(1), ' ');
                lyrics.get(query, receivedMessage);
                break;
            case "help":
                receivedMessage.reply('Fuck you');
                break;
            default:
                receivedMessage.channel.send('Seems you wrote a wrong command. Type $help to see commands');
        }
    }
}