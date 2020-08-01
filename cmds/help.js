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
        if (!args.length) {
            const embed = MessageEmbed
                .setAuthor('Abyss help', 'https://i.imgur.com/ANXxtH4.png')
                .setDescription(`you can type ${prefix}help <command> to get more info on the command itself`)
                .addFields(cmd)
                .setFooter(`requested by ${message.author.tag}`, message.author.displayAvatarURL())
                .setTimestamp(message.createdAt)
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
            .setTimestamp(message.createdAt)
            if (command.aliases) {
                embed.addField('Alias(es)', `${command.aliases.join(', ')}`)
            }
            if (command.usage) {
                embed.addField('Usage', `${prefix}${command.name} ${command.usage}`)
            }
            message.channel.send(embed)
    }
}    