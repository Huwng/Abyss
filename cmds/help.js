const Discord = require(`discord.js`)
const fs = require(`fs`)
const cmd = require(`../main.js`).cmdl
module.exports = {
    name:'help',
    description:"display help",
    execute(message, args){
        const MessageEmbed = new Discord.MessageEmbed()
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
            .setTitle('Abyss cmds')
            .addFields(cmd)
            .setFooter(`requested by ${message.author.tag} @ ${date}`, 'https://i.imgur.com/ANXxtH4.png')
            message.channel.send(embed)
    }
}    