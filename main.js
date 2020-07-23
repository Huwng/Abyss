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
                let date = message.createdAt
                var dd = date.getDate()
                var mm = date.getMonth()+1  
                var yyyy = date.getFullYear()
                var h = date.getHours()
                var m = date.getMinutes()
                var s = date.getSeconds()
                if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm}
                if(h<10){h='0'+h}if(m<10){m='0'+m}if(s<10){s='0'+s}
                date = h+':'+m+':'+s+' '+dd+'/'+mm+'/'+yyyy
                const MessageEmbed = new Discord.MessageEmbed()
                const embed = MessageEmbed
                .setAuthor(`${me.author.tag}`,me.author.displayAvatarURL())
                .setFooter(`Quoted by ${message.author.tag} @ ${date} | #${me.channel.name}`,message.author.displayAvatarURL())
                if (me.content != ''){embed.setDescription(me.content)}
                if (me.attachments != {}) {
                    let sample = '.tif.png.jpg.jpeg.webp.gif'
                    let attach = me.attachments.get(me.attachments.firstKey())
                    let l = attach.name.split('.').pop()
                    if (sample.indexOf(l) === -1){
                        embed.addField("Attachment",`[${attach.name}](${attach.url})`)
                    } else {
                        embed.setImage(attach.url)
                    }
                }
                embed.addField("Jump URL",`[Click here](${message.content})`)
                message.channel.send(embed)
            }
        )
        return
    } 
    if(!message.content.startsWith(prefix) || message.author.bot) return
    const args = message.content.slice(prefix.length).split(/ +/)
    const commandName = args.shift().toLowerCase()
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
    if (!command) return message.channel.send(`command doesnt even exist lmao, type \`${prefix}help\` to see what we offer.`)
    if (command.category = "admin stuff" && message.author.id != admin) return message.reply('ya aint foolin me lmao')
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
}