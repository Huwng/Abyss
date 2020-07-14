const discord = require(`discord.js`)
const MessageEmbed = new discord.MessageEmbed()
const h = require(`nekos.life`)
const neko = new h()

module.exports = {
    name:'embedexample',
    description:"shows wth is a embed",
    execute(message, args){
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
            .setDescription('hello')
            //.setImage(url)
            .setFooter(`requested by ${message.author.tag} @ ${date}, image provided by nekos.life`, 'https://i.imgur.com/ANXxtH4.png')
            message.channel.send(embed)
          }
        test()
    }
}