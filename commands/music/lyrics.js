const { Command, CommandoMessage } = require("discord.js-commando");
const {BotNotInVoiceChannel } = require('../../error.json');
const lyricsFinder = require('lyrics-finder');

module.exports = class LyricsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'lyrics',
            aliases: ['ly'],
            group: 'music',
            memberName: 'lyrics',
            description: "Affiche les paroles d'une chanson"
        });
    }

    /**
     * 
     * @param {CommandoMessage} message
     * @param {String} query
     */
    async run(message) {
        const voiceChannel = message.member.voice.channel;
        const server = message.client.server;
        if  (!message.client.voice.connections.first()) {
            return message.say(BotNotInVoiceChannel);
        };
        var titre = [];
        var author = [];
        var queue = [];
        var lettre;

        for (var i = 0; i < (server.currentVideo[voiceChannel.id].title.length); i++) {
            lettre = server.currentVideo[voiceChannel.id].title[i];
            if (lettre == '-' || lettre == '[' || lettre == '(') {
                if (lettre == '-') {
                    author = queue.join('');
                    queue = [];
                }
                if ((lettre == '[' || lettre == '(') && (typeof (author) == 'string')) {
                    titre = queue.join('');
                }
            } else {
                queue.push(lettre);
            }
        }
        if (titre.length == 0) {
            titre = queue.join('');
            author = "";
        }
        
        let lyrics = await lyricsFinder(author, titre) || "Aucun résultat trouvé pour cette chanson";
        if (lyrics.length < 2000) {
            return message.say(lyrics);  
            }
        var separateur = Math.trunc(lyrics.length/2000);
        for (var i = 0; i <= separateur; i++) {
            message.say(lyrics.substr(i*2000,(i+1)*2000))
        };
         
    }
}