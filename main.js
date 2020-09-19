require('dotenv').config()
const Discord = require(`discord.js`)
const client = new Discord.Client()
const prefix = process.env.prefix
const admin = process.env.admin
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
for (i=0; i<cmd.length-1; ++i) {
    if (cmd[i].name ==="ignore") {
        cmd.splice(i,1)
    }
    if (cmd[i].name === cmd[i+1].name) {
        cmd[i].value = cmd[i].value + ', ' + cmd[i+1].value
        cmd.splice(i+1,1)
        --i
    }
}
client.once('ready', () => {
    console.log('we are live!')
    client.user.setActivity(`#bot-development`,{type:'WATCHING'})
})
let regex = /(?:https:\/\/((?:canary\.)|(?:ptb\.))?((?:discordapp\.com)|((?:discord\.com)))\/channels\/)/gi
client.on('message', message => {
    let check = regex.test(message.content)
    if (check && !message.author.bot) {
        let k = message.content
        k = k.replace(regex,"").split("/")
        client.guilds.cache.get(k[0]).channels.cache.get(k[1]).messages.fetch(k[2]).then(me => 
            {
                if (me.embeds.length !== 0) {
                    message.channel.send(`Raw embed from ${me.author.tag} in <#${me.channel.name}>`) 
                    message.channel.send(me.embeds) 
                    return
                }
                const MessageEmbed = new Discord.MessageEmbed()
                const embed = MessageEmbed
                .setTimestamp(message.createdAt)
                .setAuthor(`${me.author.tag}`,me.author.displayAvatarURL())
                .setFooter(`Quoted by ${message.author.tag} | #${me.channel.name}`,message.author.displayAvatarURL())
                .addField("Jump URL",`[Click here](${message.content})`)
                if (me.content != ''){embed.setDescription(me.content)}
                let arr = [...me.attachments.keys()]
                if (arr.length > 0) {
                    let sample = /(?:.png)|(?:.jpg)|(?:.jpeg)|(?:.gif)|(?:.tif)|(?:.webp)/gi
                    let attach = me.attachments.get(me.attachments.firstKey())
                    let l = `.${attach.name.split('.').pop()}`
                    if (!sample.test(l)){
                        embed.addField("Attachment",`[${attach.name}](${attach.url})`)
                    } else {
                        embed.setImage(attach.url)
                    }
                }
                message.channel.send(embed)
            }
        )
        return
    } 
    if(!message.content.startsWith(prefix) || message.author.bot) return
    const args = message.content.slice(prefix.length).split(/ +/)
    const commandName = args.shift().toLowerCase()
    if (commandName === '') {
        client.commands.get('help').execute(message, args) 
        return
    }
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
    if (!command) return message.channel.send(`command doesnt even exist lmao, type \`${prefix}help\` to see what we offer.`)
    if (command.category == "admin stuff" && message.author.id !== admin) return message.reply('ya aint foolin me lmao')
    if (command.category == "ignore" && message.author.id !== admin) return
    try {
	    command.execute(message, args)
    } catch (error) {
	    console.error(error)
	    message.reply('there was an error trying to execute that command!')
}
})
console.log(process.env)
client.login(process.env.token)
module.exports = {
    cmdl: cmd,
    prefix: prefix,
}