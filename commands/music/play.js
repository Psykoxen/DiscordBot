const {VoiceConnection} = require('discord.js');
const { Command, CommandoMessage } = require("discord.js-commando");
const { UserNotInVoiceChannel, AddQueue, StartQueue } = require('../../error.json');
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
        
        if (!message.member.voice.channel) {
            return message.say(UserNotInVoiceChannel);
        }

        await message.member.voice.channel.join().then((connection) => {
            
            ytsr(query, {key: key, maxResults: 1, type: 'video'}).then((results) => {
                if (results.results[0]) {
                    const foundVideo = {title: results.results[0].title, url:results.results[0].link};

                    if (server.currentVideo.url != "") {
                        server.queue.push({ title:results.results[0].title , url: results.results[0].link});
                        return message.say(':repeat_one: ' + "`" +foundVideo.title + "`" + AddQueue);                      
                    }                 
                    server.currentVideo = foundVideo;
                    this.runVideo(message,connection);
                    
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
        const server = message.client.server;
        const dispatcher = connection.play( await ytdl(server.currentVideo.url, {filter: 'audioonly'}), {type: 'opus' } );
        
        server.queue.shift();
        server.dispatcher = dispatcher;
        server.connection = connection;

        dispatcher.on('finish', () => {
            if (server.queue[0]) {
                server.currentVideo = server.queue[0];
                return this.runVideo(message, connection, server.currentVideo.url);
            }
        });
        return message.say(StartQueue + "`" + server.currentVideo.title + "`");
    }
}