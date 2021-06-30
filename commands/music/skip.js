const { Command, CommandoMessage } = require("discord.js-commando");
const { UserNotInVoiceChannel, BotNotInVoiceChannel, StartQueue, MusicSkip } = require('../../error.json')
const ytdl = require('ytdl-core-discord');

module.exports = class SkipCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'skip',
            aliases: ['s'],
            group: 'music',
            memberName: 'skip',
            description: 'Passe à la musique suivante'
        });
    }
    /**
     * 
     * @param {CommandoMessage} message 
     */
    async run(message) {
        const voiceChannel = message.member.voice.channel;
        const server = message.client.server;
        
        if (!voiceChannel) {
            return message.say(UserNotInVoiceChannel);
        }
        if  (!message.client.voice.connections.first()) {
            return message.say(BotNotInVoiceChannel);
        }
        console.log(server.queue[voiceChannel.id][0])
        if (!server.queue[voiceChannel.id][0]) {
            console.log("True")
            console.log(server.currentVideo[voiceChannel.id].url)
            console.log(!server.currentVideo[voiceChannel.id].url)
            if (server.currentVideo[voiceChannel.id].url) {
                console.log("True")
                server.connection[voiceChannel.id].dispatcher.end();
            }           
            server.currentVideo[voiceChannel.id] = {title: "", url: ""};
            return message.say(MusicSkip)        
        }

        if (server.repeat[voiceChannel.id] == true) {
            server.queue[voiceChannel.id].push({ title:server.currentVideo[voiceChannel.id].title , url: server.currentVideo[voiceChannel.id].url})
        } 
        server.currentVideo[voiceChannel.id] = server.queue[voiceChannel.id][0];
        server.dispatcher[voiceChannel.id] = server.connection[voiceChannel.id].play(await ytdl(server.currentVideo[voiceChannel.id].url, {filter: 'audioonly'}), {type: 'opus' } );
        server.queue[voiceChannel.id].shift();

        message.say(MusicSkip);
        return message.say(StartQueue + "`" + server.currentVideo[voiceChannel.id].title + "`");
    }
}