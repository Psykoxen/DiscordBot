const { Command, CommandoMessage } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const GphApiClient = require('giphy-js-sdk-core');

module.exports = class Coordonnées extends Command {
    constructor(client) {
        super(client, {
            name: 'minecraft.coordonnee',
            group: 'minecraft',
            memberName: 'minecraft.coordonnee',
            description: 'Modifie la liste des coordonées',
            args: [
                {
                    key: 'query',
                    prompt: 'Que souhaitez-vous faire (add / delete)?',
                    type: 'string'
                },
                {
                    key: 'name',
                    prompt: "Le nom du lieu",
                    type: 'string'
                },
                {
                    key: 'who',
                    prompt: "Les coordonées que vous souhaitez ajouter",
                    type: 'string'
                }
            ]
        });
    }

    

    async run(message, { query , name, who}) {
        const server = message.client.server;

        
    }
}
