const { Command, CommandoMessage } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const time = require('minutes');

module.exports = class minecraft_renew extends Command {
    constructor(client) {
        super(client, {
            name: 'minecraft.renew',
            group: 'minecraft',
            memberName: 'minecraft.renew',
            description: 'Envoie une notification pour informer de la nécessiter de renew',
            args: [
                {
                    key: 'query',
                    prompt: 'Que souhaitez-vous faire (start / end)?',
                    type: 'string'
                },
            ]
        });
    }

    

    async run(message, { query }) {
        console.log('Start')
        const server = message.client.server;
        var now = time('today')
        console.log(now)
        console.log(message)
        while (query == 'start'){
            console.log('pass')
            if (time('today') == now+1){
                console.log(true)
                now = time('today')
                this.message(message);
                return  this.run(message, {query})  
           }
        }
        
    }
    async message(message){
        console.log(message)
        return message.say('@here Le serveur expirera dans 10 min !');
    }
}
