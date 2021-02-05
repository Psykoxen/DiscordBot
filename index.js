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
	repeat: false,
	currentVideo: {title: "", url: ""},
	dispatcher: null,
	connection: null
}

client.once('ready', () => {
	console.log(`Connecté en tant que ${client.user.tag} - (${client.user.id})`);
})

client.on('error' , (error) => console.error(error));

client.login('ODA2NTU4MjAwNTE3NzU0ODkx.YBrL3A.YDSofj3TdAusv5lAPCdEneUPEGo');
// process.env.TOKEN
// 'ODA2NTU4MjAwNTE3NzU0ODkx.YBrL3A.YDSofj3TdAusv5lAPCdEneUPEGo'