const Discord = require(`discord.js`)
const client = new Discord.Client()
const config = require('./config.json')
const prefix = config.prefix
const fs = require(`fs`)
client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./cmds/').filter(file => file.endsWith('.js'))
var cmd = []
for(const file of commandFiles){
    const command = require(`./cmds/${file}`)
    client.commands.set(command.name, command)
    cmd.push({name: `${command.name}`, value: `${command.description}`, inline: true})
}
client.once('ready', () => {
    console.log('we are live!')
    client.user.setActivity(`#bot-development`,{type:'WATCHING'})
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const commands = args.shift().toLowerCase()

    if(commands === 'hi' || commands === 'hello') {
        client.commands.get('hi').execute(message, args)
    } else if(commands === 'embedexample' || commands === 'ee') {
        client.commands.get('embedexample').execute(message, args)
    } else if(commands === 'kiss') {
        client.commands.get('kiss').execute(message, args)
    } else if(commands === 'help') {
        client.commands.get('help').execute(message, args)
    } else if(commands === 'reload') {
        client.commands.get('reload').execute(message, args)
    } 
})

client.login(config.token)
module.exports = {
    cmdl: cmd
}