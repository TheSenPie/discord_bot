require('dotenv').config();

const _ = require("lodash");
const path = require('path');

const stickers = require(path.join(__dirname, "/stickers"));
const lyrics = require(path.join(__dirname, "/lyrics"));
const ass = require(path.join(__dirname, "/ass"));

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
                ass.poop(receivedMessage, commands[1]);
                break;
            case "lyrics":
                let query = _.join(commands.slice(1), ' ');
                lyrics.get(query, receivedMessage);
                break;
            case "help":
                receivedMessage.reply('Fuck you');
                break;
            default:
                if(command == "stehan" && commands[1])
                    stickers.send("stehan", commands[1], receivedMessage);
                else if(command == "volk" && commands[1])
                    stickers.send("volk", commands[1], receivedMessage);
                else
                    receivedMessage.channel.send('Seems you wrote a wrong command. Type $help to see commands');
        }
    }
}