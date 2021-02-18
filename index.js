const {CommandoClient} = require('discord.js-commando');
const { type } = require('os');
const path = require('path');

const client = new CommandoClient({
	commandPrefix: '*',
	owner: '357532006193692672',
});

client.registry
	.registerDefaultTypes()
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerGroup('gif','Gif')
	.registerGroup('music','Music')
	.registerGroup('brawlstar','BrawlStar')
	.registerGroup('league_of_legend','League Of Legend')
	.registerCommandsIn(path.join(__dirname, 'commands'))

client.server = {
	queue: {},
	repeat: {},
	currentVideo: {},
	dispatcher: {},
	connection: {},

}

client.once('ready', () => {
	console.log(`Connecté en tant que ${client.user.tag} - (${client.user.id})`);
	client.user.setStatus('dnd');
	client.user.setActivity("comment fonctionner", {type: 'WATCHING'});
})

client.on('error' , (error) => console.error(error));

client.login(process.env.TOKEN);
