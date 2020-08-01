const discord = require(`discord.js`)
const h = require(`nekos.life`)
const neko = new h()
const MessageEmbed = new discord.MessageEmbed()

module.exports = {
    name:'kiss',
    description:"love isnt in the air lmao",
    category:"weeb stuff",
    usage:"<user>",
    execute(message, args){
        let mentioned = message.mentions.users.first()
        if (!message.mentions.users.size) {
            return message.reply('specify one to kiss m8, are u kissin yourself?')
         } else if (message.mentions.users.size > 1) {
            return message.reply('we dont support group kiss atm, check back later (or never)')
        } else if (mentioned === message.author) {
            return message.reply('i get you\'re very lonely but how tf would u kiss yourself?')
        } else if (mentioned.bot) {
            return message.reply('technophilia isnt yet supported nerd')
        } 
        async function test() {
            let url = await (await neko.sfw.kiss()).url
            const embed = MessageEmbed
            .setDescription(`${message.author} kissed ${mentioned}`)
            .setImage(url)
            .setTimestamp(message.createdAt)
            .setFooter(`requested by ${message.author.tag}, image provided by nekos.life`, message.author.displayAvatarURL())
            message.channel.send(embed)
          }
        test()
    }
}