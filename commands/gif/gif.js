const { Command, CommandoMessage } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const GphApiClient = require('giphy-js-sdk-core');

module.exports = class GifCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'gif',
            group: 'gif',
            memberName: 'gif',
            description: 'Cherche un gif',
            args: [
                {
                    key: 'query',
                    prompt: 'Quel gif souhaitez-vous ?',
                    type: 'string'
                }
            ]
        });
    }

    

    async run(message, { query }) {

        const giphy = GphApiClient("mCLOHfxu31HX7Q78z5U4CxYD9SoVc7kw")
        var giph = []; 
        giphy.search('gifs', {"q": query , limit : 100}).then((response) => {
            response.data.forEach((gifObject) => {
                giph.push(gifObject)     
            });
            return message.say(giph[Math.floor(Math.random() * 10)].url);
        });
        
    }

    
}
