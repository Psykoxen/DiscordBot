const { Command, CommandoMessage } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const GphApiClient = require('giphy-js-sdk-core');

module.exports = class GifCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'gifto',
            group: 'gif',
            memberName: 'gifto',
            description: 'Envoie un gif à un menbre',
            args: [
                {
                    key: 'query',
                    prompt: 'Quel gif souhaitez-vous ?',
                    type: 'string'
                },
                {
                    key: 'who',
                    prompt: "A qui souhaitez vous l'envoyer ?",
                    type: 'string'
                }
            ]
        });
    }

    

    async run(message, { query , who}) {
        const giphy = GphApiClient("mCLOHfxu31HX7Q78z5U4CxYD9SoVc7kw")
        var giph = []; 
        giphy.search('gifs', {"q": query , limit : 100}).then((response) => {
            response.data.forEach((gifObject) => {
                giph.push(gifObject)     
            });
            message.say("Quelqu'un t'as envoyé un(e) "+ query + " " + who)
            
            return message.say(giph[Math.floor(Math.random() * 10)].url);
        });
        
    }

    
}
