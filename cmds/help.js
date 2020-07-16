const Discord = require(`discord.js`)
module.exports = {
    name:'help',
    description:"display help, what're you hoping to get here?",
    category:"general",
    usage:"[command]",
    execute(message, args){
        const main = require(`../main.js`)
        const cmd = main.cmdl
        const prefix = main.prefix
        const MessageEmbed = new Discord.MessageEmbed()
        const { commands } = message.client
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
        if (!args.length) {
            const embed = MessageEmbed
                .setAuthor('Abyss help', 'https://i.imgur.com/ANXxtH4.png')
                .setDescription(`you can type ${prefix}help <command> to get more info on the command itself`)
                .addFields(cmd)
                .setFooter(`requested by ${message.author.tag} @ ${date}`, message.author.displayAvatarURL())
                message.channel.send(embed)
                return
        }
        const name = args[0].toLowerCase()
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name))
        if (!command) return message.channel.send(`not a valid command, type \`${prefix}help\` to see what we offer first.`)
        const embed = MessageEmbed
            .setAuthor('Abyss help', 'https://i.imgur.com/ANXxtH4.png')
            .setFooter(`requested by ${message.author.tag} @ ${date}`, message.author.displayAvatarURL())
            .setTitle(`${prefix}${command.name}`)
            .setDescription(`${command.description} \n **category: ${command.category}**`)
            if (command.aliases) {
                embed.addField('Alias(es)', `${command.aliases.join(', ')}`)
            }
            if (command.usage) {
                embed.addField('Usage', `${prefix}${command.name} ${command.usage}`)
            }
            message.channel.send(embed)
    }
}    