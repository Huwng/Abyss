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
            const embed = MessageEmbed
            .setDescription(`${message.author} kissed ${mentioned}`)
            .setImage(url)
            .setFooter(`requested by ${message.author.tag} @ ${date}, image provided by nekos.life`, message.author.displayAvatarURL())
            message.channel.send(embed)
          }
        test()
    }
}