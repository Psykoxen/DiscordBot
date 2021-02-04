const { Command, CommandoMessage } = require("discord.js-commando");
const { UserNotInVoiceChannel, BotNotInVoiceChannel, BadQueue, MusicSkip } = require('../../error.json')
const ytdl = require('ytdl-core-discord');

module.exports = class SkipToCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'skipto',
            aliases: ['sk','st'],
            group: 'music',
            memberName: 'skipto',
            description: 'Sauter vers une musique',
            args: [
                {
                    key: 'index',
                    prompt: 'Quel est le numéro de la musique sélectionné',
                    type: 'integer'
                }
            ]
        });
    }

    /**
     * 
     * @param {CommandoMessage} message 
     */
    async run(message, { index }) {
        const voiceChannel = message.member.voice.channel;
        const server = message.client.server;

        if (!voiceChannel) {
            return message.say(UserNotInVoiceChannel);
        }
        if  (!message.client.voice.connections.first()) {
            return message.say(BotNotInVoiceChannel);
        }

        index--;

        if (!server.queue[index]) {
            server.currentVideo = {title: "", url: ""};
            return message.say(BadQueue);
        }
    
        server.currentVideo = server.queue[index];
        server.dispatcher = server.connection.play(await ytdl(server.currentVideo.url, {filter: 'audioonly'}), {type: 'opus' } );
        server.queue.splice(index, 1);

        return message.say(MusicSkip);
    }
}