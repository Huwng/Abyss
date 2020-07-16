const Discord = require(`discord.js`)
const client = new Discord.Client()
const config = require('./config.json')
const prefix = config.prefix
const admin = config.admin
const fs = require(`fs`)
client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./cmds/').filter(file => file.endsWith('.js'))
var cmd = []
for(const file of commandFiles){
    const command = require(`./cmds/${file}`)
    client.commands.set(command.name, command)
    cmd.push({name: `${command.category}`, value: `\`${command.name}\``, inline: true})
}
cmd = cmd.sort((c1,c2) => (c1.name > c2.name) ? 1 : (c1.name < c2.name) ? -1 : 0)
client.once('ready', () => {
    console.log('we are live!')
    client.user.setActivity(`#bot-development`,{type:'WATCHING'})
})
for (i=0; i<cmd.length-2; ++i) {
    if (cmd[i].name ==="ignore") {
        cmd.splice(i,1)
        continue
    }
    if (cmd[i].name === cmd[i+1].name) {
        cmd[i].value = cmd[i].value + ', ' + cmd[i+1].value
        cmd.splice(i+1,1)
    }
}
client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const commandName = args.shift().toLowerCase()
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
    if (!command) return message.channel.send(`command doesnt even exist lmao, type \`${prefix}help\` to see what we offer.`)
    try {
	    command.execute(message, args)
    } catch (error) {
	    console.error(error)
	    message.reply('there was an error trying to execute that command!')
}
})

client.login(config.token)
module.exports = {
    cmdl: cmd,
    prefix: prefix,
    admin: admin,
}