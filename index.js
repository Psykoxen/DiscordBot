const {CommandoClient} = require('discord.js-commando');
const path = require('path');

const client = new CommandoClient({
	commandPrefix:'*',
	owner: '357532006193692672',
});

client.registry
	.registerDefaultTypes()
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerGroup('music','Music')
	.registerGroup('gif','Gif')
	.registerCommandsIn(path.join(__dirname, 'commands'))

client.server = {
	queue: [],
	currentVideo: {title: "", url: ""},
	dispatcher: null,
	connection: null
}

client.once('ready', () => {
	console.log(`Connecté en tant que ${client.user.tag} - (${client.user.id})`);
})

client.on('error' , (error) => console.error(error));

client.login(process.env.TOKEN);
// process.env.TOKEN
// 'ODA2NTU4MjAwNTE3NzU0ODkx.YBrL3A.74-PTldlswHmv6PrrUGhktQ_1_E'