const path = require('path');

module.exports = {
    send: (pack, index, message) => {
        message.channel.send({files: [path.join(appRoot, `/static/img/stickers/${pack}/sticker${index}.webp`)]});
        message.delete();
    }
}