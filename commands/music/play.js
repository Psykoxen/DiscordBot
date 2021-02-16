const {VoiceConnection} = require('discord.js');
const { Command, CommandoMessage } = require("discord.js-commando");
const { UserNotInVoiceChannel, AddQueue, StartQueue, NeadQueue, NotFound } = require('../../error.json');
const { key } = require('../../config.json');
const ytdl = require('ytdl-core-discord');
const ytsr = require('youtube-search');

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            aliases: ['p'],
            group: 'music',
            memberName: 'play',
            description: 'Lit une musique',
            args: [
                {
                    key: 'query',
                    prompt: 'Quel musique souhaitez-vous écouter',
                    type: 'string'
                }
            ]
        });
    }

    /**
     * 
     * @param {CommandoMessage} message 
     * @param {str} query
     */
    async run(message, { query }) {
        const server = message.client.server
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.say(UserNotInVoiceChannel);
        }
        if  (!server.currentVideo[voiceChannel.id]) {
            server.currentVideo[voiceChannel.id] = {title: "", url: ""};
            server.queue[voiceChannel.id] = [];
        }
        
        await voiceChannel.join().then((connection) => {
            
            ytsr(query, {key: key, maxResults: 1, type: 'video'}).then((results) => {
                
                if (results.results[0]) {
                    const foundVideo = {title: results.results[0].title, url: results.results[0].link};
                    if (server.currentVideo[voiceChannel.id].url != "") {
                        server.queue[voiceChannel.id].push({ title:results.results[0].title , url: results.results[0].link});
                        console.log(server.queue)
                        return message.say(':up: ' + "`" +foundVideo.title + "`" + AddQueue);                      
                    }                 
                    server.currentVideo[voiceChannel.id] = foundVideo;
                    this.runVideo(message,connection);
                    
                }
                if (!results.results[0]) {
                    return message.say(NotFound);
                }
            });

        });
    }
    /**
     * 
     * @param {CommandoMessage} message 
     * @param {VoiceConnection} connection 
     */
    async runVideo(message, connection) {
        const voiceChannel = message.member.voice.channel;
        const server = message.client.server;

        const dispatcher = connection.play( await ytdl(server.currentVideo[voiceChannel.id].url, {filter: 'audioonly'}), {type: 'opus' } );
        
        server.queue[voiceChannel.id].shift();
        server.dispatcher[voiceChannel.id] = dispatcher;
        server.connection[voiceChannel.id] = connection;
        server.dispatcher[voiceChannel.id].on('finish', () => {
            if (server.repeat == true) {
                server.queue[voiceChannel.id].push({ title:server.currentVideo[voiceChannel.id].title , url: server.currentVideo[voiceChannel.id].url})
            }     
            if (server.queue[voiceChannel.id][0]) {        
                server.currentVideo[voiceChannel.id] = server.queue[voiceChannel.id][0];
                return this.runVideo(message, connection);
            }
            server.currentVideo[voiceChannel.id] = {title: "", url: ""};
            server.queue[voiceChannel.id] = [];       
            if (!voiceChannel) {
                return voiceChannel.leave();
            }
            return message.say(NeadQueue);
                   
        });
        return message.say(StartQueue + "`" + server.currentVideo[voiceChannel.id].title + "`");
    }
}