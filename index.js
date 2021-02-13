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
	.registerCommandsIn(path.join(__dirname, 'commands'))

client.server = {
	queue: [],
	repeat: false,
	currentVideo: {title: "", url: ""},
	dispatcher: null,
	connection: null
}

client.once('ready', () => {
	console.log(`Connecté en tant que ${client.user.tag} - (${client.user.id})`);
	client.user.setStatus('dnd');
	client.user.setActivity('comment fonctionner', {type: 'LISTENING'});
})

client.on('error' , (error) => console.error(error));

client.login(process.env.TOKEN);
// process.env.TOKEN
